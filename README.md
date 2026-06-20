# HAMR II Instructions Site Maintenance README

## Purpose

This README explains how the HAMR II instruction site is organized and how to maintain it safely.

The site is a plain static HTML, CSS, and JavaScript site. There is no build system. Most shared behavior is centralized in `assets/js/common.js`, and most shared styling is in `assets/css/common.css`.

The maintenance goal is:

**Make routine changes in one place whenever possible, avoid duplicated logic, and preserve wording accuracy.**

---

## Core maintenance principles

1. **Single source of truth where possible**

   * Task order, blockers, summaries, and published state belong in `TASK_META` in `assets/js/common.js`.
   * Glossary titles, aliases, subtitles, and preview images belong in `GLOSSARY` in `assets/js/common.js`.
   * Shared styling belongs in `assets/css/common.css`.

2. **Do not hand-copy shared UI**

   * The task status strip, footer, task-card status, glossary preview, and image lightbox are shared behaviors.
   * If a change affects multiple pages, update the shared code instead of patching each page by hand.

3. **Clear, concise, correct**

   * Use direct language.
   * Keep part descriptions platform-specific.
   * State what a part is doing on this vehicle, not just what it is in general.

4. **Avoid unintended changes**

   * Change only the files needed.
   * Prefer narrow edits.
   * Re-check blockers, glossary hits, and preview behavior after any site-wide change.

---

## High-level site structure

Main pages:

* `index.html`

  * homepage
  * task cards
  * workflow chart
* `parts-guide.html`

  * parts guide
  * hover previews
  * glossary term annotation
* `tools-inventory.html`

  * tools list
* `task1-...html` through `task16-...html`

  * individual task pages

Shared assets:

* `assets/css/common.css`
* `assets/js/common.js`
* `assets/images/...`

---

## Asset organization

Use the current image structure:

* `assets/images/parts/`
* `assets/images/fasteners/`
* `assets/images/tools/`
* `assets/images/diagrams/`
* `assets/images/tasks/taskX/`

Use them as follows:

* `parts/` for platform parts, close-up references, cables, ports, and support photos tied to a specific component
* `fasteners/` for screws, nuts, spacers, standoffs, and similar hardware
* `tools/` for hand tools, bench tools, and test gear
* `diagrams/` for shared figures such as the workflow chart, motor map, and propeller map
* `tasks/taskX/` for task-specific figures extracted from the slide deck or PDF

Do not create duplicate copies of the same asset in multiple folders unless there is a strong reason.

---

## The main shared file: `assets/js/common.js`

This file is the site’s behavior center.

It currently handles:

* glossary definitions and aliases
* glossary annotation and hover previews
* task metadata
* task blockers and progress state
* homepage task-card rendering and status
* site navigation
* footer rendering
* image lightbox behavior

If you are about to edit several pages to change one repeated behavior, stop and check `common.js` first.

---

## `TASK_META`: the task-flow source of truth

`TASK_META` controls the site’s task flow.

Each task entry defines:

* `id`
* `order`
* `published`
* `title`
* `slug`
* `blockers`
* `summary`

Example:

```js
"task13": {
  "id": "task13",
  "order": 13,
  "published": true,
  "title": "Task 13: Sensor calibration",
  "slug": "task13-sensor-calibration",
  "day": "",
  "blockers": ["task7", "task9", "task10", "task12"],
  "summary": "Calibrate the accelerometer and compass, then enter the measured battery voltage in Mission Planner."
}
```

### When to edit `TASK_META`

Edit `TASK_META` when you need to change:

* task order
* home-page summaries
* task blockers
* task publication state
* page slug

### When not to edit `TASK_META`

Do not edit it for:

* step-by-step instructional text
* figures
* parts lists inside the page body
* glossary alias behavior

Those belong elsewhere.

---

## Task pages

Each task page contains the page-specific instructional content.

Shared task-page behavior is handled centrally.

### Shared task-page elements

These are rendered or controlled by shared code:

* top navigation
* blocker banner
* task completion button
* task progress state
* footer
* glossary hover previews
* image lightbox

### What should remain page-local

These belong in the task HTML itself:

* task steps
* task figures
* parts required
* tools required
* common errors
* task-specific callouts and notes

### Layout conventions

Use the same numbered-step hierarchy on every task page:

* `Step 1. Prepare ...`
* `Step 2. Connect ...`
* action numbers continue across steps rather than restarting

Do not introduce a second heading system on only one task. Consistent numbered steps make classroom references and cross-task navigation easier.

Task pages use inner bubbles/cards for sections such as:

* task intro
* parts required
* tools required
* steps
* common errors

Do not reintroduce the old giant outer white wrapper around the entire task page.

---

## Task introductions

Each task page should begin with a short intro bubble before `Parts required`.

Use two short items:

* **What this task accomplishes**
* **What these parts do**

For software/setup tasks, use:

* **What this task accomplishes**
* **What this setup does**

Guidelines:

* Keep each item short.
* Keep it platform-specific.
* Do not use generic filler.
* State the operational role of the parts on HAMR II.

Example:

* `This task installs the flight controller and electronic speed controller as a vibration-isolated stack.`
* `The flight controller is the autopilot board, and the electronic speed controller distributes controlled power to all four motors.`

---

## Parts required and kit structure

`Parts required` must explicitly state when an item comes from a larger kit.

Use indented kit structure when appropriate.

Example pattern:

* Frame kit

  * lower deck
  * upper deck
  * four frame standoffs
* Fastener kit

  * `GPS + Camera` subkit
  * `FC/ESC Stack` subkit

This makes accountability and retrieval easier for cadets.

### Important retrieval emphasis

Two components require extra emphasis because there are **two sets per package**:

* **GPS/compass modules**
* **flight controllers**

Instructional wording should make this explicit wherever those items are first retrieved.

Recommended wording:

* `Each package contains two GPS/compass sets. Retrieve only one set for your team. Split the package with another team. If you cannot find a partner set, ask an instructor.`
* `Each package contains two flight controllers. Retrieve only one flight controller for your team. Split the package with another team. If you cannot find a partner set, ask an instructor.`

Package contents currently used in Task 6:

* **ESC package**
  * electronic speed controller
  * one 8-wire JST-GH/JST-SH ribbon cable
  * four silicone rubber vibration dampers
* **Flight controller package**
  * flight controller
  * four silicone rubber vibration dampers

Keep these package contents synchronized among Task 6, the Parts Guide, and the glossary.

---

## Tool usage in steps

Every fastening, measuring, trimming, holding, or soldering step should explicitly say which tool to use.

Do not rely only on the page-level `Tools required` list.

### Preferred wording

* `Use the 1.5 mm Allen key to tighten ...`
* `Use the 2.0 mm Allen key to tighten ...`
* `Use the 2.5 mm Allen key to tighten ...`
* `Use the 5.5 mm nut driver on the locknuts and the 2.5 mm Allen key on the screw heads.`
* `Use needle-nose pliers to hold the screw while starting the threads.`
* `Use the soldering iron set to 750 °F.`

### Avoid vague wording such as

* `tighten them`
* `secure the nuts`
* `install the screws`

Instead, specify:

* which tool
* which side of the hardware
* what is being held fixed

---

## Terminology standardization

Use these canonical visible terms wherever possible:

* `Raspberry Pi`
* `camera module`
* `camera ribbon cable`
* `camera/GPS mount`
* `Raspberry Pi mount`
* `lower frame`
* `lower deck`
* `nylon-insert locknut`
* `upper deck`
* `frame standoff`
* `flight controller`
* `electronic speed controller`
* `FC/ESC cable`
* `FC/RPi cable`
* `GPS/compass cable`
* `battery pad`

### Important terminology rule

If `flight controller` is spelled out in a sentence, then `electronic speed controller` should also be spelled out rather than using `ESC` alone.

Good:

* `Connect the flight controller to the electronic speed controller.`

Avoid mixing styles like:

* `Connect the flight controller to the ESC.`

Abbreviations are still acceptable after the first clear use on a page, but the wording on a page should be internally consistent.

---

## Fastener notation rules

Use the multiplication sign `×` in visible text.

Examples:

* `M3 × 8 mm`
* `M2.5 × 6 mm`
* `M3 × 10 mm flat-head countersunk screw`

Do not use plain `x` in visible copy.

### Standard fastener wording

Prefer:

* `round-head screw`
* `socket-head screw`
* `flat-head countersunk screw`
* `nylon-insert locknut`

Be consistent across:

* task pages
* parts guide
* glossary
* figure captions

---

## Frame-kit screw identification

State only the frame-supplied hardware that is actually used in the build unless a page is explicitly documenting the full kit contents.

For the current build, the frame-supplied round-head screws used in the instructions are:

1. `M3 × 8 mm round-head screws`
2. `M3 × 12 mm round-head screws`

The FC/ESC stack no longer uses the former 30 mm frame-kit screws. Its complete hardware set is supplied in the Fastener Kit under the `FC/ESC Stack` subkit:

1. Four `M3 × 40 mm button-head hex-drive screws` — McMaster `92095A203`
2. Four `8 mm nylon through-hole spacers` — McMaster `93657A011`
3. Four `M3 nylon-insert locknuts` — McMaster `90576A102`

The current build also uses two black zip ties from the frame kit.

Be consistent across:

* task pages
* parts guide
* glossary
* figure captions

Do not infer per-system usage counts from packaging order or from unused hardware present in the kit.

---

## The glossary system

The glossary is defined by `GLOSSARY` in `common.js`.

Each entry typically contains:

* `title`
* `subtitle`
* `img`
* `aliases`

### Current glossary behavior

The glossary matcher uses compiled regex-like matching logic with these goals:

* longest match first
* handle plural forms for specific technical terms
* tolerate `×` vs `x`
* tolerate common hyphen/space variations
* avoid noisy single-word triggers

### Good glossary aliases

Prefer specific phrases such as:

* `camera module`
* `camera ribbon cable`
* `camera/GPS mount`
* `Raspberry Pi mount`
* `M3 × 8 mm round-head screw`
* `M2.5 × 6 mm round-head hex screw`

### Bad glossary aliases

Avoid broad nuisance terms such as:

* `camera`
* `mount`
* `deck`
* `frame`
* `screw`
* `FC`
* `ESC`
* `8-wire cable`
* `JST-SH connector`
* `JST-GH connector`

These produce too many false matches.

### Plural handling

Plural matching should exist only for specific technical terms.

Good plural candidates:

* `camera module` / `camera modules`
* `frame standoff` / `frame standoffs`
* `cable tie` / `cable ties`
* full screw names ending in `screw` / `screws`

Avoid adding plural logic to broad terms that should not be glossary triggers in the first place.

---

## Parts guide hover previews

The parts guide contains hover-preview behavior for some rows and subtables.

When a row is supposed to show a preview, make sure it has the required preview data attributes.

### If a row should preview an image

Provide:

* preview title
* preview subtitle or meta text
* image path when available

If no image exists yet, a placeholder preview may be used, but it is better to add the real image once available.

### Common failure mode

If some subtable rows preview and others do not, check whether those rows are missing the preview attributes that the hover code expects.

---

## Figures and figure extraction

Task figures are currently extracted from the deck or PDF and stored as image assets.

### Current figure workflow

* Use the PDF as the source when PowerPoint text boxes render badly.
* Keep the same slide/page ordering as the deck.
* Use a tight bounding box around the actual figure.
* Do not crop content.
* Keep a small padding margin.

### Automatic numbering and references

Task figures are numbered automatically in DOM order by `initFigureNumbering()` in `assets/js/common.js`.

For each figure:

* wrap the image or placeholder in `.figure-card`
* assign a stable, semantic `data-figure-id`
* write the caption text without a manually typed figure number

Example:

```html
<div class="figure-card" data-figure-id="stack-alignment">
  <img src="assets/images/tasks/task6/task6-stack-alignment.png" alt="FC/ESC stack aligned over the lower deck">
  <div class="figure-caption">Correct FC/ESC stack orientation and mounting-hole alignment.</div>
</div>
```

Reference a figure by its stable ID rather than by a typed number:

```html
<a class="figure-ref" data-figure-ref="stack-alignment"></a>
```

The browser inserts labels such as `Fig. 6f` and updates all matching references. Inserting, deleting, or moving a figure therefore renumbers the page without requiring manual edits.

Rules:

* Every `.figure-card` on a task page is numbered.
* `data-figure-id` values must be unique within that page.
* Use descriptive IDs that remain valid even if the figure moves.
* Do not type `Fig. 6a`, `Fig. 6b`, and similar labels directly into captions or body text.
* Keep figures in the same order as the procedure that uses them.

Run `python scripts/audit_figures.py` before packaging the site. The audit checks duplicate IDs, unresolved references, and manually typed task-figure labels.

Also run `python scripts/audit_site.py`. It checks task-title consistency, numbered-step structure, deprecated terminology, list nesting, and local asset references.

### Placeholder figures

Use a `.figure-placeholder` inside the numbered `.figure-card` when the final photograph is not yet available. State exactly what the replacement image must show and include a suggested filename. Replace the placeholder as soon as a verified image is available.

---

## Workflow chart

The workflow chart is derived from the blocker structure in `TASK_META`.

If the blockers change, regenerate the workflow diagram.

### Important note

The current chart-drawing script has been fragile because it used manual node positions and naive elbow routing.

If the figure needs more major work, prefer a proper graph-layout tool rather than hand-tuned coordinates.

At a minimum, after changing blockers:

* verify the blocker logic in `TASK_META`
* regenerate the workflow chart
* confirm arrows still make sense visually

---

## Common update workflows

### 1. Change task blockers

Edit `TASK_META` in `common.js`.

Then:

* reload the task pages
* check the status chips
* check the home-page task cards
* regenerate the workflow chart if the site includes a blocker-flow figure

### 2. Add or revise glossary entries

Edit `GLOSSARY` in `common.js`.

Then:

* verify no nuisance matches were introduced
* test singular and plural forms if relevant
* test part names inside task pages and the parts guide

### 3. Add a new image

Place the image in the correct `assets/images/...` folder.

Then update the relevant:

* glossary entry
* task figure reference
* parts-guide preview row
* tools page entry

### 4. Change task wording

Edit the relevant task page HTML.

Then check:

* glossary triggers
* image captions
* tool wording
* consistency with terminology rules

---

## Release and packaging guidance

When creating a distribution ZIP:

* **Do not include `.git`**
* do not include development scratch files
* do not include obsolete duplicate packages unless intentionally archiving them

Before packaging, check:

* all figure/image paths resolve
* `common.js` has no syntax errors
* glossary preview works
* task navigation works
* progress button still behaves correctly
* parts-guide hover previews work

---

## Sanity-check list after any meaningful edit

Run this checklist after shared changes:

1. Home page

   * task cards render
   * blocker chips make sense
   * `Open task` buttons align correctly

2. One early hardware task

   * glossary previews work
   * images enlarge correctly
   * task intro bubble renders

3. One mid-build task

   * blocker logic renders correctly
   * completion button state is correct
   * tool wording is explicit

4. Parts guide

   * hover previews work on normal rows and subtables
   * glossary annotation is not noisy

5. Tools page

   * images resolve
   * wording remains consistent with task pages

---

## Style guide for future edits

### Preferred voice

* direct
* technical
* concise
* instructional

### Avoid

* vague verbs without a tool or action target
* generic part descriptions that do not explain the part’s role on HAMR II
* unnecessary repetition
* terminology drift across pages

### Preferred sentence style

* short declarative sentences
* imperative steps
* one action per sentence when possible

Good:

* `Use the 2.5 mm Allen key to tighten the four M3 × 8 mm socket-head screws.`

Less good:

* `Tighten the screws securely.`

---

## Known maintenance hotspots

These are the places most likely to break when making site-wide changes:

* glossary alias matching
* hover-preview binding in subtables
* task-strip rendering
* blocker logic and workflow chart drift
* image paths after asset reorganization
* terminology inconsistencies between task pages and glossary entries

When changing any of these, re-test more than one page.

---

## Recommended future improvements

If the site grows much further, the cleanest long-term upgrade would be a lightweight template system or static-site generator so that repeated HTML patterns are no longer hand-maintained.

Until then, keep using the no-build approach with these rules:

* centralize metadata in `common.js`
* centralize shared styling in `common.css`
* keep page HTML focused on page-specific instructional content

---

## Maintenance note log

### Current emphasis items to preserve

* Sensor calibration is a dedicated task and should not be silently folded away.
* Frame-kit screw identification must stay explicit.
* GPS and flight controller retrieval steps must emphasize that each package contains two sets and cadets should take only one and split with another team.
* If `flight controller` is spelled out in a sentence, `electronic speed controller` should also be spelled out for consistency.
* Visible fastener sizes should use `×`, not `x`.

---

## Last reminder

When in doubt, prefer the change that:

* reduces duplication
* improves clarity for cadets
* keeps terminology consistent
* and is easy to verify after editing


---

## Team progress sync

Phase 1 shared progress uses a Team ID entered from the Task Navigator panel.

Frontend files:

* `assets/js/team-sync-config.js`
* `assets/js/common.js`

Backend reference:

* `backend/google-apps-script/Code.gs`
* `backend/google-apps-script/README.md`

Behavior:

* Progress is still cached locally in the browser.
* If a Team ID is set and the Apps Script endpoint is configured, progress is also synced to the shared backend.
* Different browsers using the same Team ID will read and write the same task state.

Keep the endpoint URL out of `common.js`. Put it only in `assets/js/team-sync-config.js`.
