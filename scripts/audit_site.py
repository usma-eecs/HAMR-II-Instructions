#!/usr/bin/env python3
"""Audit cross-page structure, terminology, and local asset references."""

from __future__ import annotations

import re
import sys
from pathlib import Path
from urllib.parse import unquote, urlparse

from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
TASK_FILES = sorted(ROOT.glob("task*.html"), key=lambda p: int(re.search(r"task(\d+)", p.name).group(1)))

BANNED_VISIBLE_TERMS = {
    "Phase I.": "Use the site-wide Step 1, Step 2 hierarchy.",
    "POSHOLD": "Use LOITER.",
    "Queue the mission": "Use the current Upload workflow.",
    "Add New Task": "Use Add Task, then Create New Task.",
    "TELEM cable": "Use FC/RPi cable.",
    "JST-SH receptacle on the underside of the flight controller": "The JST-SH receptacle is on the ESC.",
    "lock nut": "Use locknut as one word.",
    "lock nuts": "Use locknuts as one word.",
}


def local_target_exists(page: Path, target: str) -> bool:
    if not target or target.startswith(("#", "data:", "mailto:", "tel:")):
        return True
    parsed = urlparse(target)
    if parsed.scheme or parsed.netloc:
        return True
    path = unquote(target.split("#", 1)[0].split("?", 1)[0])
    if not path:
        return True
    return (page.parent / path).resolve().exists()


def main() -> int:
    errors: list[str] = []
    if len(TASK_FILES) != 16:
        errors.append(f"Expected 16 task pages; found {len(TASK_FILES)}")

    common_js = (ROOT / "assets/js/common.js").read_text(encoding="utf-8")

    for page in TASK_FILES:
        raw = page.read_text(encoding="utf-8")
        soup = BeautifulSoup(raw, "html.parser")
        h1 = soup.select_one(".hero h1")
        title = soup.title.string.strip() if soup.title and soup.title.string else ""
        h1_text = h1.get_text(" ", strip=True) if h1 else ""
        if not h1_text:
            errors.append(f"{page.name}: missing hero h1")
        if title != h1_text:
            errors.append(f"{page.name}: <title> and hero h1 differ: {title!r} vs {h1_text!r}")
        if h1_text and f'"title": "{h1_text}"' not in common_js:
            errors.append(f"{page.name}: TASK_META title does not match {h1_text!r}")

        flow = soup.select_one(".instruction-flow")
        if not flow:
            errors.append(f"{page.name}: missing .instruction-flow")
        elif not any(re.match(r"Step \d+\.", h.get_text(" ", strip=True)) for h in flow.select("h4")):
            errors.append(f"{page.name}: instruction flow has no numbered Step heading")

        visible = soup.get_text(" ", strip=True)
        for term, reason in BANNED_VISIBLE_TERMS.items():
            if term in visible:
                errors.append(f"{page.name}: contains {term!r}. {reason}")

        for list_tag in soup.find_all(["ul", "ol"]):
            for child in list_tag.children:
                if getattr(child, "name", None) and child.name != "li":
                    errors.append(f"{page.name}: <{list_tag.name}> has direct <{child.name}> child; nest it inside <li>")
                    break

        for node in soup.find_all(src=True):
            if not local_target_exists(page, node.get("src", "")):
                errors.append(f"{page.name}: missing local src {node.get('src')}")
        for node in soup.find_all(href=True):
            if not local_target_exists(page, node.get("href", "")):
                errors.append(f"{page.name}: missing local href {node.get('href')}")

    for page in [ROOT / "parts-guide.html", ROOT / "tools-inventory.html", ROOT / "index.html"]:
        soup = BeautifulSoup(page.read_text(encoding="utf-8"), "html.parser")
        for node in soup.find_all(src=True):
            if not local_target_exists(page, node.get("src", "")):
                errors.append(f"{page.name}: missing local src {node.get('src')}")
        for node in soup.find_all(href=True):
            if not local_target_exists(page, node.get("href", "")):
                errors.append(f"{page.name}: missing local href {node.get('href')}")

    if errors:
        print("Site audit failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"Site audit passed: {len(TASK_FILES)} task pages; titles, structure, terminology, and local references are consistent.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
