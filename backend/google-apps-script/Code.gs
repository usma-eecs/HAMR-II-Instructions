const SPREADSHEET_ID = 'PASTE_YOUR_SPREADSHEET_ID_HERE';
const TEAMS_SHEET_NAME = 'Teams';
const EVENTS_SHEET_NAME = 'Events';
const TASK_IDS = [
  'task1','task2','task3','task4','task5','task6','task7','task8',
  'task9','task10','task11','task12','task13','task14','task15','task16'
];

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
    return ContentService
      .createTextOutput(callback + '(' + json + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
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

  const row = sheets.teams.getRange(rowIndex, 1, 1, 4 + TASK_IDS.length).getValues()[0];
  const state = row[3] || defaultState_();
  const updatedAt = row[1] || '';
  const completedCount = Number(row[2] || 0);
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
  const taskFlags = state.split('').map(bit => bit === '1');

  const sheets = ensureSheets_();
  let rowIndex = findTeamRow_(sheets.teams, teamId);
  const rowValues = [[teamId, timestamp, completedCount, state].concat(taskFlags)];

  if (rowIndex) {
    sheets.teams.getRange(rowIndex, 1, 1, rowValues[0].length).setValues(rowValues);
  } else {
    sheets.teams.appendRow(rowValues[0]);
    rowIndex = sheets.teams.getLastRow();
  }

  sheets.events.appendRow([
    timestamp,
    teamId,
    'set',
    state,
    completedCount,
    source,
    rowIndex
  ]);

  return buildPayload_(teamId, state, timestamp, completedCount);
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

  ensureHeader_(teams, ['Team ID', 'Updated At', 'Completed Count', 'State'].concat(TASK_IDS));
  ensureHeader_(events, ['Timestamp', 'Team ID', 'Action', 'State', 'Completed Count', 'Source', 'Row']);

  return { spreadsheet: ss, teams: teams, events: events };
}

function ensureHeader_(sheet, header) {
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, header.length).setValues([header]);
    sheet.setFrozenRows(1);
    return;
  }

  const existing = sheet.getRange(1, 1, 1, header.length).getValues()[0];
  const mismatch = header.some(function(value, index) {
    return existing[index] !== value;
  });

  if (mismatch) {
    sheet.getRange(1, 1, 1, header.length).setValues([header]);
    sheet.setFrozenRows(1);
  }
}

function findTeamRow_(sheet, teamId) {
  const finder = sheet.getRange('A:A').createTextFinder(teamId).matchEntireCell(true).findNext();
  return finder ? finder.getRow() : 0;
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
  for (let i = 0; i < TASK_IDS.length; i += 1) {
    output += bits.charAt(i) === '1' ? '1' : '0';
  }
  return output;
}

function defaultState_() {
  return new Array(TASK_IDS.length + 1).join('0');
}

function countCompleted_(state) {
  return normalizeState_(state).split('').filter(function(bit) {
    return bit === '1';
  }).length;
}
