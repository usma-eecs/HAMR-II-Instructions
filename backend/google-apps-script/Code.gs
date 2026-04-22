const SPREADSHEET_ID = '1Bhp9EuNLlqYO81DxcNE08sidaK6FeHUNaqHW_9LYztc';
const TEAMS_SHEET_NAME = 'Teams';
const EVENTS_SHEET_NAME = 'Events';
const TASKS = [
  { id: 'task1',  title: 'Task 1: Prepare the Raspberry Pi' },
  { id: 'task2',  title: 'Task 2: Install GPS/Compass' },
  { id: 'task3',  title: 'Task 3: Install Camera' },
  { id: 'task4',  title: 'Task 4: Assemble the lower frame' },
  { id: 'task5',  title: 'Task 5: Install motors' },
  { id: 'task6',  title: 'Task 6: Mount FC/ESC' },
  { id: 'task7',  title: 'Task 7: Set up powertrain' },
  { id: 'task8',  title: 'Task 8: Set up the upper deck' },
  { id: 'task9',  title: 'Task 9: Mate upper and lower frames' },
  { id: 'task10', title: 'Task 10: Mate camera/GPS mount onto the frame' },
  { id: 'task11', title: 'Task 11: Install Mission Planner' },
  { id: 'task12', title: 'Task 12: Set up param file' },
  { id: 'task13', title: 'Task 13: Sensor calibration' },
  { id: 'task14', title: 'Task 14: Motor check' },
  { id: 'task15', title: 'Task 15: Install propellers' },
  { id: 'task16', title: 'Task 16: Flight Day' }
];

const TEAM_ID_COL = 1;
const UPDATED_AT_COL = 2;
const COMPLETED_COUNT_COL = 3;
const FIRST_TASK_COL = 4;
const TASK_COUNT = TASKS.length;
const LAST_TASK_COL = FIRST_TASK_COL + TASK_COUNT - 1;

function doGet(e) {
  const params = e && e.parameter ? e.parameter : {};
  const action = String(params.action || 'get').toLowerCase();
  const callback = String(params.callback || '').trim();

  let payload;
  try {
    if (action === 'get') {
      payload = getTeamState_(params.teamId);
    } else if (action === 'set') {
      payload = setTeamState_(params.teamId, params.state, params.source);
    } else {
      payload = { ok: false, error: 'Unknown action.' };
    }
  } catch (error) {
    payload = { ok: false, error: String(error && error.message || error) };
  }

  return respond_(payload, callback);
}

function doPost(e) {
  let body = {};
  try {
    body = e && e.postData && e.postData.contents ? JSON.parse(e.postData.contents) : {};
  } catch (error) {
    body = {};
  }

  const action = String(body.action || 'get').toLowerCase();
  let payload;
  try {
    if (action === 'get') {
      payload = getTeamState_(body.teamId);
    } else if (action === 'set') {
      payload = setTeamState_(body.teamId, body.state, body.source);
    } else {
      payload = { ok: false, error: 'Unknown action.' };
    }
  } catch (error) {
    payload = { ok: false, error: String(error && error.message || error) };
  }

  return respond_(payload, '');
}

function respond_(payload, callback) {
  const json = JSON.stringify(payload);
  if (callback) {
    const safeCallback = String(callback || '').trim();
    if (!/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(safeCallback)) {
      return ContentService
        .createTextOutput(JSON.stringify({ ok: false, error: 'Invalid callback.' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    return ContentService
      .createTextOutput('window[' + JSON.stringify(safeCallback) + '] && window[' + JSON.stringify(safeCallback) + '](' + json + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}

function setupBackend() {
  const sheets = ensureSheets_();
  applySheetLayout_(sheets.teams);
  SpreadsheetApp.flush();
}

function installEditTrigger() {
  const projectTriggers = ScriptApp.getProjectTriggers();
  const hasTrigger = projectTriggers.some(function(trigger) {
    return trigger.getHandlerFunction() === 'onTeamsSheetEdit';
  });

  if (!hasTrigger) {
    ScriptApp.newTrigger('onTeamsSheetEdit')
      .forSpreadsheet(SPREADSHEET_ID)
      .onEdit()
      .create();
  }
}

function removeEditTriggers() {
  ScriptApp.getProjectTriggers().forEach(function(trigger) {
    if (trigger.getHandlerFunction() === 'onTeamsSheetEdit') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
}

function onTeamsSheetEdit(e) {
  if (!e || !e.range) return;

  const range = e.range;
  const sheet = range.getSheet();
  if (sheet.getName() !== TEAMS_SHEET_NAME) return;
  if (range.getRow() < 2) return;

  const startCol = range.getColumn();
  const endCol = startCol + range.getNumColumns() - 1;
  const overlapsTrackedCols = !(endCol < TEAM_ID_COL || startCol > LAST_TASK_COL);
  if (!overlapsTrackedCols) return;

  const row = range.getRow();
  const teamId = sanitizeTeamId_(sheet.getRange(row, TEAM_ID_COL).getValue());
  if (!teamId) return;

  sheet.getRange(row, TEAM_ID_COL).setValue(teamId);
  ensureCheckboxesForRow_(sheet, row);
  applyCompletedCountFormula_(sheet, row);
  sheet.getRange(row, UPDATED_AT_COL).setValue(new Date());

  const state = buildStateFromSheetRow_(sheet, row);
  logEvent_(teamId, 'manual-edit', state, countCompleted_(state), 'sheet-edit', row);
}

function getTeamState_(rawTeamId) {
  const teamId = sanitizeTeamId_(rawTeamId);
  if (!teamId) {
    throw new Error('Missing Team ID.');
  }

  const sheets = ensureSheets_();
  const rowIndex = findTeamRow_(sheets.teams, teamId);
  if (!rowIndex) {
    return buildPayload_(teamId, defaultState_(), '', 0);
  }

  const state = buildStateFromSheetRow_(sheets.teams, rowIndex);
  const updatedAt = sheets.teams.getRange(rowIndex, UPDATED_AT_COL).getValue() || '';
  const completedCount = countCompleted_(state);
  return buildPayload_(teamId, state, updatedAt, completedCount);
}

function setTeamState_(rawTeamId, rawState, rawSource) {
  const teamId = sanitizeTeamId_(rawTeamId);
  if (!teamId) {
    throw new Error('Missing Team ID.');
  }

  const state = normalizeState_(rawState);
  const source = String(rawSource || '').trim();
  const timestamp = new Date();
  const completedCount = countCompleted_(state);
  const taskFlags = state.split('').map(function(bit) { return bit === '1'; });

  const sheets = ensureSheets_();
  let rowIndex = findTeamRow_(sheets.teams, teamId);

  if (!rowIndex) {
    rowIndex = appendEmptyTeamRow_(sheets.teams, teamId);
  }

  ensureCheckboxesForRow_(sheets.teams, rowIndex);
  sheets.teams.getRange(rowIndex, TEAM_ID_COL).setValue(teamId);
  sheets.teams.getRange(rowIndex, UPDATED_AT_COL).setValue(timestamp);
  sheets.teams.getRange(rowIndex, FIRST_TASK_COL, 1, TASK_COUNT).setValues([taskFlags]);
  applyCompletedCountFormula_(sheets.teams, rowIndex);

  const derivedState = buildStateFromSheetRow_(sheets.teams, rowIndex);
  const derivedCount = countCompleted_(derivedState);
  logEvent_(teamId, 'set', derivedState, derivedCount, source, rowIndex);

  return buildPayload_(teamId, derivedState, timestamp, derivedCount);
}

function buildPayload_(teamId, state, updatedAt, completedCount) {
  return {
    ok: true,
    teamId: teamId,
    state: normalizeState_(state),
    updatedAt: updatedAt ? new Date(updatedAt).toISOString() : '',
    completedCount: Number(completedCount || 0)
  };
}

function ensureSheets_() {
  if (!SPREADSHEET_ID || SPREADSHEET_ID === 'PASTE_YOUR_SPREADSHEET_ID_HERE') {
    throw new Error('Set SPREADSHEET_ID at the top of Code.gs before deployment.');
  }

  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const teams = ss.getSheetByName(TEAMS_SHEET_NAME) || ss.insertSheet(TEAMS_SHEET_NAME);
  const events = ss.getSheetByName(EVENTS_SHEET_NAME) || ss.insertSheet(EVENTS_SHEET_NAME);

  ensureTeamsSheet_(teams);
  ensureEventsSheet_(events);

  return { spreadsheet: ss, teams: teams, events: events };
}

function ensureTeamsSheet_(sheet) {
  const header = ['Team ID', 'Updated At', 'Completed Count'].concat(TASKS.map(function(task) {
    return task.title;
  }));
  ensureHeader_(sheet, header);
  applySheetLayout_(sheet);
}

function ensureEventsSheet_(sheet) {
  ensureHeader_(sheet, ['Timestamp', 'Team ID', 'Action', 'State', 'Completed Count', 'Source', 'Row']);
}

function applySheetLayout_(sheet) {
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, LAST_TASK_COL);

  if (sheet.getFilter()) {
    sheet.getFilter().remove();
  }
  const lastRow = Math.max(sheet.getLastRow(), 2);
  sheet.getRange(1, 1, lastRow, LAST_TASK_COL).createFilter();

  const checkboxRange = sheet.getRange(2, FIRST_TASK_COL, Math.max(sheet.getMaxRows() - 1, 1), TASK_COUNT);
  checkboxRange.insertCheckboxes();

  const headerRange = sheet.getRange(1, 1, 1, LAST_TASK_COL);
  headerRange.setFontWeight('bold');
  headerRange.setWrap(true);
}

function ensureHeader_(sheet, header) {
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, header.length).setValues([header]);
    return;
  }

  const existingWidth = Math.max(sheet.getLastColumn(), header.length);
  const existing = sheet.getRange(1, 1, 1, existingWidth).getValues()[0].slice(0, header.length);
  const mismatch = header.length !== existing.length || header.some(function(value, index) {
    return existing[index] !== value;
  });

  if (mismatch) {
    sheet.getRange(1, 1, 1, header.length).setValues([header]);
  }
}

function findTeamRow_(sheet, teamId) {
  const finder = sheet.getRange('A:A').createTextFinder(teamId).matchEntireCell(true).findNext();
  return finder ? finder.getRow() : 0;
}

function appendEmptyTeamRow_(sheet, teamId) {
  const rowValues = [teamId, '', ''];
  for (let i = 0; i < TASK_COUNT; i += 1) {
    rowValues.push(false);
  }
  sheet.appendRow(rowValues);
  const rowIndex = sheet.getLastRow();
  ensureCheckboxesForRow_(sheet, rowIndex);
  applyCompletedCountFormula_(sheet, rowIndex);
  return rowIndex;
}

function ensureCheckboxesForRow_(sheet, rowIndex) {
  sheet.getRange(rowIndex, FIRST_TASK_COL, 1, TASK_COUNT).insertCheckboxes();
}

function applyCompletedCountFormula_(sheet, rowIndex) {
  const firstTaskA1 = sheet.getRange(rowIndex, FIRST_TASK_COL).getA1Notation();
  const lastTaskA1 = sheet.getRange(rowIndex, LAST_TASK_COL).getA1Notation();
  sheet.getRange(rowIndex, COMPLETED_COUNT_COL).setFormula('=COUNTIF(' + firstTaskA1 + ':' + lastTaskA1 + ',TRUE)');
}

function buildStateFromSheetRow_(sheet, rowIndex) {
  const values = sheet.getRange(rowIndex, FIRST_TASK_COL, 1, TASK_COUNT).getValues()[0];
  return values.map(function(value) {
    return isTruthyTaskCell_(value) ? '1' : '0';
  }).join('');
}

function isTruthyTaskCell_(value) {
  if (value === true) return true;
  if (value === false || value === '' || value === null) return false;
  const normalized = String(value).trim().toLowerCase();
  return normalized === '1' || normalized === 'true' || normalized === 'yes' || normalized === 'y' || normalized === 'done' || normalized === 'complete' || normalized === 'completed';
}

function logEvent_(teamId, action, state, completedCount, source, rowIndex) {
  const sheets = ensureSheets_();
  sheets.events.appendRow([
    new Date(),
    teamId,
    action,
    normalizeState_(state),
    Number(completedCount || 0),
    String(source || '').trim(),
    Number(rowIndex || 0)
  ]);
}

function sanitizeTeamId_(value) {
  return String(value || '')
    .toUpperCase()
    .replace(/[^A-Z0-9-]/g, '')
    .slice(0, 20);
}

function normalizeState_(value) {
  const bits = String(value || '').replace(/[^01]/g, '');
  let output = '';
  for (let i = 0; i < TASK_COUNT; i += 1) {
    output += bits.charAt(i) === '1' ? '1' : '0';
  }
  return output;
}

function defaultState_() {
  return new Array(TASK_COUNT + 1).join('0');
}

function countCompleted_(state) {
  return normalizeState_(state).split('').filter(function(bit) {
    return bit === '1';
  }).length;
}
