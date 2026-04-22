# Google Apps Script team progress backend

This backend is the Phase 1 shared-progress store for the HAMR II build site.

It is designed for a static site hosted on GitHub Pages. The frontend writes and reads task completion by Team ID through a deployed Google Apps Script web app.

## What it creates

Use one Google Sheet with two tabs:

- `Teams`
  - one row per Team ID
  - current completion state for all 16 tasks
- `Events`
  - append-only log of updates

The `Teams` tab is the instructor-facing operational view. It sorts, filters, and exports to CSV cleanly.

## Setup

1. Create a new Google Sheet.
2. Copy the spreadsheet ID from its URL.
3. Create a new standalone Google Apps Script project.
4. Paste `Code.gs` into the project.
5. Replace `PASTE_YOUR_SPREADSHEET_ID_HERE` at the top of `Code.gs`.
6. Deploy the script as a web app.
   - Execute as: **Me**
   - Who has access: **Anyone**
7. Copy the deployed web app URL.
8. In the website repo, open `assets/js/team-sync-config.js`.
9. Set:

```javascript
window.HAMR_TEAM_SYNC_CONFIG = {
  endpoint: "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE"
};
```

10. Publish the updated site.

## How the frontend uses it

The frontend sends JSONP-style GET requests so shared progress works from a static site without a server.

### Read team progress

`?action=get&teamId=ALPHA-01&callback=...`

### Write team progress

`?action=set&teamId=ALPHA-01&state=101100...&source=task7-set-up-powertrain.html&callback=...`

The `state` value is a 16-character bit string in task order:

- `1` = complete
- `0` = incomplete

## Team ID guidance

Use instructor-issued Team IDs.

Suggested format:
- 6 to 12 characters
- uppercase letters, numbers, hyphen
- examples: `A3-07`, `BRAVO-12`, `HAMR-204`

Anyone who knows a Team ID can update that team's progress, so avoid trivial IDs like `TEAM1` if the site is broadly visible.

## Instructor workflow

The `Teams` tab is the easiest day-to-day view.

Recommended columns there:
- Team ID
- Updated At
- Completed Count
- State
- task1 ... task16

From Google Sheets you can:
- sort by `Completed Count`
- filter for teams stuck before a certain task
- export to CSV when needed

## Notes

- The site still keeps a local browser cache. If the network is temporarily unavailable, cadets do not lose what they just checked off.
- When the same Team ID is used on another browser, the site syncs that team's state when the page gains focus, becomes visible again, or opens the Task Navigator.
