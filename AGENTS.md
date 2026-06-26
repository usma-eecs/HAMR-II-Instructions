# HAMR Website Instructions

## Core standards

- Prioritize technical accuracy, operational clarity, concision, and elegance.
- Preserve design consistency across all task pages.
- Do not silently change technical values, hardware dimensions, connector
  assignments, operating limits, or procedural sequences.
- When sources conflict, report the conflict before choosing one.
- Use the current Storm King QRH as the authority for ATAK UAS Tool wording.
- Use sentence case for task and section titles.
- Use "locknut" rather than "lock nut."
- Use "LOITER" rather than "POSHOLD."
- Use "FC/RPi cable" rather than "TELEM cable."

## Workflow

- Inspect the whole repository before making cross-cutting changes.
- Propose substantial structural changes before implementing them.
- Preserve user edits.
- Make minimal, maintainable changes.
- Run all available audits and tests after editing.
- Review the rendered desktop and mobile pages.
- Do not create a release ZIP unless explicitly requested.

## Task-page design

- Use the established Step 1, Step 2, etc. hierarchy.
- Use continuous arabic action numbering within each task.
- Use stop boxes only for actual stop conditions.
- Put final verification in the standard End state box.
- Keep figures adjacent to the instructions they support.
- Use semantic image filenames.
- Never hardcode displayed figure numbers; use the automatic figure system.

## Validation

Run:

- python scripts/audit_figures.py
- python scripts/audit_site.py
- JavaScript syntax checks
- local-resource and broken-link checks
- Playwright smoke tests in Chromium, Firefox, and WebKit