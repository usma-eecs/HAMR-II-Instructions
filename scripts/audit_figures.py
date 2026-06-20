#!/usr/bin/env python3
"""Audit automatic task-figure IDs and references using only the standard library."""

from __future__ import annotations

from dataclasses import dataclass, field
from html.parser import HTMLParser
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
TASK_PATTERN = re.compile(r"task(\d+)-.*\.html$")
MANUAL_LABEL = re.compile(r"\bFigs?\.\s*\d+[a-z]+\b", re.IGNORECASE)


@dataclass
class FigureRecord:
    figure_id: str
    caption_parts: list[str] = field(default_factory=list)

    @property
    def caption(self) -> str:
        return " ".join("".join(self.caption_parts).split())


@dataclass
class ReferenceRecord:
    target: str
    text_parts: list[str] = field(default_factory=list)

    @property
    def text(self) -> str:
        return " ".join("".join(self.text_parts).split())


class FigureAuditParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.stack: list[dict[str, object]] = []
        self.figures: list[FigureRecord] = []
        self.references: list[ReferenceRecord] = []
        self.manual_labels: list[str] = []
        self.script_or_style_depth = 0

    @staticmethod
    def _attrs(attrs: list[tuple[str, str | None]]) -> dict[str, str]:
        return {name: value or "" for name, value in attrs}

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = self._attrs(attrs)
        classes = set(attributes.get("class", "").split())
        frame: dict[str, object] = {"tag": tag}

        if tag in {"script", "style"}:
            self.script_or_style_depth += 1

        if "figure-card" in classes:
            record = FigureRecord(attributes.get("data-figure-id", "").strip())
            self.figures.append(record)
            frame["figure"] = record

        current_figure = self._current("figure")
        if "figure-caption" in classes and isinstance(current_figure, FigureRecord):
            frame["caption_for"] = current_figure

        if "data-figure-ref" in attributes:
            reference = ReferenceRecord(attributes.get("data-figure-ref", "").strip())
            self.references.append(reference)
            frame["reference"] = reference

        self.stack.append(frame)

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.handle_starttag(tag, attrs)
        self.handle_endtag(tag)

    def handle_endtag(self, tag: str) -> None:
        for index in range(len(self.stack) - 1, -1, -1):
            frame = self.stack[index]
            if frame.get("tag") == tag:
                del self.stack[index:]
                break
        if tag in {"script", "style"} and self.script_or_style_depth:
            self.script_or_style_depth -= 1

    def _current(self, key: str) -> object | None:
        for frame in reversed(self.stack):
            if key in frame:
                return frame[key]
        return None

    def handle_data(self, data: str) -> None:
        caption = self._current("caption_for")
        if isinstance(caption, FigureRecord):
            caption.caption_parts.append(data)

        reference = self._current("reference")
        if isinstance(reference, ReferenceRecord):
            reference.text_parts.append(data)

        if self.script_or_style_depth or isinstance(reference, ReferenceRecord):
            return
        if MANUAL_LABEL.search(data):
            self.manual_labels.append(" ".join(data.split()))


def audit_page(path: Path) -> list[str]:
    errors: list[str] = []
    parser = FigureAuditParser()
    parser.feed(path.read_text(encoding="utf-8"))

    ids = [figure.figure_id for figure in parser.figures if figure.figure_id]
    for index, figure in enumerate(parser.figures, start=1):
        if not figure.figure_id:
            errors.append(f"{path.name}: figure {index} has no data-figure-id")
        if not figure.caption:
            errors.append(f"{path.name}: figure '{figure.figure_id or index}' has no caption")
        elif MANUAL_LABEL.search(figure.caption):
            errors.append(f"{path.name}: figure '{figure.figure_id or index}' has a manually typed figure label")

    duplicates = sorted({figure_id for figure_id in ids if ids.count(figure_id) > 1})
    for figure_id in duplicates:
        errors.append(f"{path.name}: duplicate data-figure-id '{figure_id}'")

    known = set(ids)
    for reference in parser.references:
        if not reference.target:
            errors.append(f"{path.name}: empty data-figure-ref")
        elif reference.target not in known:
            errors.append(f"{path.name}: unresolved figure reference '{reference.target}'")
        if reference.text:
            errors.append(f"{path.name}: figure reference '{reference.target}' contains hard-coded display text")

    for label in parser.manual_labels:
        errors.append(f"{path.name}: manually typed figure label in body text: {label!r}")

    return errors


def main() -> int:
    errors: list[str] = []
    task_files = sorted(path for path in ROOT.glob("task*.html") if TASK_PATTERN.match(path.name))
    figure_count = 0

    for path in task_files:
        parser = FigureAuditParser()
        parser.feed(path.read_text(encoding="utf-8"))
        figure_count += len(parser.figures)
        errors.extend(audit_page(path))

    if errors:
        print("Figure audit failed:")
        for error in errors:
            print(f"  - {error}")
        return 1

    print(f"Figure audit passed: {len(task_files)} task pages, {figure_count} figures.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
