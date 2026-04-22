# Google Apps Script team progress backend

This backend stores shared team progress for the HAMR II build site.

It is meant for a static frontend hosted on GitHub Pages. The frontend still sends and receives the 16-bit task state string, but the backend no longer stores that string in the sheet as a separate source of truth.

Instead:
- the `Teams` sheet stores one checkbox column per task
- the backend constructs the `110011...` state string from those checkbox cells in real time
- instructors can update progress manually in the sheet without touching any encoded state field

## What it creates

Use one Google Sheet with two tabs:

- `Teams`
  - one row per Team ID
  - checkbox columns for all 16 tasks
  - instructor-friendly manual editing
- `Events`
  - append-only log of API writes and manual edits

## Why this version is better

The earlier pattern kept both:
- a packed state string such as `110011...`
- separate task columns

That creates two sources of truth.

This version uses the task cells as the source of truth. The backend builds the state vector on demand from the actual task columns, so:
- instructors can click checkboxes directly in Google Sheets
- frontend sync still works without changing the site architecture
- the packed state string always reflects the live sheet contents

## Teams sheet layout

Columns are:

- `Team ID`
- `Updated At`
- `Completed Count`
- one checkbox column for each task, using the task title as the column header

`Completed Count` is maintained as a spreadsheet formula.

The task columns are real Google Sheets checkboxes, so the instructor workflow is simply:
- find the team row
- check or uncheck the task boxes

## Setup

1. Create a new Google Sheet.
2. Copy the spreadsheet ID from its URL.
3. Create a new standalone Google Apps Script project.
4. Paste `Code.gs` into the project.
5. Replace `PASTE_YOUR_SPREADSHEET_ID_HERE` at the top of `Code.gs`.
6. Run `setupBackend()` once from the Apps Script editor.
   - This creates the sheets, writes headers, applies filters, and adds checkboxes.
7. Run `installEditTrigger()` once.
   - This installs an edit trigger so manual checkbox edits update `Updated At` and log an event.
8. Deploy the script as a web app.
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Use the deployed **/exec** URL, not the editor URL and not the test **/dev** URL.
9. Copy the deployed web app URL.
10. In the website repo, open `assets/js/team-sync-config.js`.
11. Set:

```javascript
window.HAMR_TEAM_SYNC_CONFIG = {
  endpoint: "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE"
};
```

12. Publish the updated site.

## CORB / cross-origin troubleshooting

If the browser console shows a cross-origin or CORB error, the web app is usually returning HTML instead of JavaScript.

Most common causes:
- the deployment is not public
- the wrong URL was pasted into `team-sync-config.js`
- the script was updated but the web app was not redeployed
- the URL is the Apps Script editor page, not the deployed web app

Use the deployed `.../exec` URL only.

Quick sanity test:

```text
...?action=get&teamId=TEST&callback=testCb
```

A working deployment should return JavaScript that looks like:

```javascript
testCb({"ok":true,...});
```

If you see an HTML sign-in page or editor page, that is the problem.

## How the frontend uses it

The frontend still uses the same API shape.

### Read team progress

`?action=get&teamId=ALPHA-01&callback=...`

The backend reads the task checkbox cells for that team row and constructs the 16-bit state string in real time.

### Write team progress

`?action=set&teamId=ALPHA-01&state=101100...&source=task7-set-up-powertrain.html&callback=...`

The backend writes the task checkbox columns, then immediately reconstructs the state string from the sheet row before returning the response.

## Instructor workflow

The `Teams` tab is the operational view.

Recommended workflow:
- filter or sort by `Completed Count`
- scan for teams stalled before a certain task
- manually check or uncheck task boxes when you need to override or correct progress
- export to CSV when needed

Because the task columns are the source of truth, manual edits are safe and straightforward.

## Team ID guidance

Use instructor-issued Team IDs.

Suggested format:
- 6 to 12 characters
- uppercase letters, numbers, hyphen
- examples: `A3-07`, `BRAVO-12`, `HAMR-204`

Anyone who knows a Team ID can update that team's progress, so avoid trivial IDs like `TEAM1` if the site is broadly visible.

## Notes

- The site still keeps a local browser cache. If the network is temporarily unavailable, cadets do not lose what they just checked off.
- When the same Team ID is used on another browser, the site syncs that team's state when the page gains focus, becomes visible again, or opens the Task Navigator.
- If you ever need to remove the manual edit trigger, run `removeEditTriggers()`.
