/**
 * EXPENSE TRACKER v2 - GOOGLE APPS SCRIPT BACKEND
 * Full feature: edit, message, templates, budgets, daily summary
 * 
 * Setup baru:
 * 1. Buka Google Sheet baru, kasih nama "Expense Tracker"
 * 2. Menu: Extensions > Apps Script
 * 3. Hapus semua kode default, paste seluruh isi file ini
 * 4. Save (Ctrl+S), kasih nama project "Expense API"
 * 5. Klik "Deploy" > "New deployment"
 * 6. Type: Web app, Execute as: Me, Who has access: Anyone
 * 7. Klik Deploy, COPY URL Web App-nya
 * 8. Paste URL ke config.js
 * 
 * UPGRADE dari v1:
 * 1. Buka Apps Script lama, hapus semua, paste kode ini
 * 2. Save, klik Deploy → Manage deployments → icon pensil
 * 3. Version: New version → Deploy
 * 4. URL tetap sama, gak perlu update config.js
 * 5. Sheet "Templates" dan "Budgets" akan dibuat otomatis saat pertama dipakai
 */

const SHEET_EXP = 'Expenses';
const SHEET_TPL = 'Templates';
const SHEET_BUD = 'Budgets';

const HEADERS_EXP = ['id', 'timestamp', 'amount', 'note', 'category', 'location', 'who', 'message', 'updated'];
const HEADERS_TPL = ['id', 'label', 'amount', 'category', 'location', 'note'];
const HEADERS_BUD = ['category', 'monthly_limit'];

function getOrCreateSheet(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  } else if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  } else {
    // Pastikan header up-to-date (untuk migrasi v1 → v2)
    const currentHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    if (currentHeaders.length < headers.length) {
      for (let i = currentHeaders.length; i < headers.length; i++) {
        sheet.getRange(1, i + 1).setValue(headers[i]).setFontWeight('bold');
      }
    }
  }
  return sheet;
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  try {
    const type = (e.parameter.type || 'expenses').toLowerCase();
    if (type === 'expenses') return getExpenses(e);
    if (type === 'templates') return getTemplates();
    if (type === 'budgets') return getBudgets();
    if (type === 'summary') return getSummary(e);
    return jsonResponse({ ok: false, error: 'Unknown type' });
  } catch (err) {
    return jsonResponse({ ok: false, error: err.toString() });
  }
}

function getExpenses(e) {
  const scope = (e.parameter.scope || 'all').toLowerCase();
  const period = (e.parameter.period || 'month').toLowerCase();
  const sheet = getOrCreateSheet(SHEET_EXP, HEADERS_EXP);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return jsonResponse({ ok: true, data: [] });
  
  const values = sheet.getRange(2, 1, lastRow - 1, HEADERS_EXP.length).getValues();
  let data = values.map(row => ({
    id: row[0],
    timestamp: row[1],
    amount: Number(row[2]) || 0,
    note: row[3] || '',
    category: row[4] || '',
    location: row[5] || '',
    who: row[6] || '',
    message: row[7] || '',
    updated: row[8] || ''
  }));
  
  if (scope === 'rumah') data = data.filter(d => d.location === 'rumah');
  else if (scope === 'rantau') data = data.filter(d => d.location === 'rantau');
  
  const now = new Date();
  if (period === 'week') {
    const cutoff = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    data = data.filter(d => new Date(d.timestamp) >= cutoff);
  } else if (period === 'month') {
    data = data.filter(d => {
      const dt = new Date(d.timestamp);
      return dt.getMonth() === now.getMonth() && dt.getFullYear() === now.getFullYear();
    });
  }
  
  data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  return jsonResponse({ ok: true, data: data });
}

function getTemplates() {
  const sheet = getOrCreateSheet(SHEET_TPL, HEADERS_TPL);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return jsonResponse({ ok: true, data: [] });
  const values = sheet.getRange(2, 1, lastRow - 1, HEADERS_TPL.length).getValues();
  const data = values.map(row => ({
    id: row[0], label: row[1], amount: Number(row[2]) || 0,
    category: row[3], location: row[4], note: row[5] || ''
  }));
  return jsonResponse({ ok: true, data: data });
}

function getBudgets() {
  const sheet = getOrCreateSheet(SHEET_BUD, HEADERS_BUD);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return jsonResponse({ ok: true, data: {} });
  const values = sheet.getRange(2, 1, lastRow - 1, HEADERS_BUD.length).getValues();
  const map = {};
  values.forEach(row => { if (row[0]) map[row[0]] = Number(row[1]) || 0; });
  return jsonResponse({ ok: true, data: map });
}

function getSummary(e) {
  const period = (e.parameter.period || 'week').toLowerCase();
  const sheet = getOrCreateSheet(SHEET_EXP, HEADERS_EXP);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return jsonResponse({ ok: true, daily: [] });
  
  const values = sheet.getRange(2, 1, lastRow - 1, HEADERS_EXP.length).getValues();
  const now = new Date();
  const days = period === 'week' ? 7 : 30;
  
  const byDate = {};
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const key = d.toISOString().slice(0, 10);
    byDate[key] = { date: key, total: 0, rantau: 0, rumah: 0 };
  }
  
  values.forEach(row => {
    const ts = new Date(row[1]);
    const key = ts.toISOString().slice(0, 10);
    if (!byDate[key]) return;
    const amt = Number(row[2]) || 0;
    byDate[key].total += amt;
    if (row[5] === 'rantau') byDate[key].rantau += amt;
    else if (row[5] === 'rumah') byDate[key].rumah += amt;
  });
  
  const daily = Object.values(byDate).sort((a, b) => a.date.localeCompare(b.date));
  return jsonResponse({ ok: true, daily: daily });
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const action = body.action || 'add';
    if (action === 'add') return addExpense(body);
    if (action === 'update') return updateExpense(body);
    if (action === 'delete') return deleteExpense(body);
    if (action === 'template_add') return addTemplate(body);
    if (action === 'template_delete') return deleteTemplate(body);
    if (action === 'budget_set') return setBudget(body);
    return jsonResponse({ ok: false, error: 'Unknown action' });
  } catch (err) {
    return jsonResponse({ ok: false, error: err.toString() });
  }
}

function addExpense(body) {
  const sheet = getOrCreateSheet(SHEET_EXP, HEADERS_EXP);
  const id = 'exp_' + new Date().getTime() + '_' + Math.floor(Math.random() * 1000);
  sheet.appendRow([
    id, new Date().toISOString(), Number(body.amount) || 0,
    body.note || '', body.category || 'lain', body.location || 'rumah',
    body.who || '', body.message || '', ''
  ]);
  return jsonResponse({ ok: true, id: id });
}

function updateExpense(body) {
  const sheet = getOrCreateSheet(SHEET_EXP, HEADERS_EXP);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return jsonResponse({ ok: false, error: 'No data' });
  const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  for (let i = 0; i < ids.length; i++) {
    if (ids[i][0] === body.id) {
      const rowNum = i + 2;
      if (body.amount !== undefined) sheet.getRange(rowNum, 3).setValue(Number(body.amount) || 0);
      if (body.note !== undefined) sheet.getRange(rowNum, 4).setValue(body.note);
      if (body.category !== undefined) sheet.getRange(rowNum, 5).setValue(body.category);
      if (body.location !== undefined) sheet.getRange(rowNum, 6).setValue(body.location);
      if (body.message !== undefined) sheet.getRange(rowNum, 8).setValue(body.message);
      sheet.getRange(rowNum, 9).setValue(new Date().toISOString());
      return jsonResponse({ ok: true });
    }
  }
  return jsonResponse({ ok: false, error: 'Not found' });
}

function deleteExpense(body) {
  const sheet = getOrCreateSheet(SHEET_EXP, HEADERS_EXP);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return jsonResponse({ ok: false, error: 'No data' });
  const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  for (let i = 0; i < ids.length; i++) {
    if (ids[i][0] === body.id) {
      sheet.deleteRow(i + 2);
      return jsonResponse({ ok: true });
    }
  }
  return jsonResponse({ ok: false, error: 'Not found' });
}

function addTemplate(body) {
  const sheet = getOrCreateSheet(SHEET_TPL, HEADERS_TPL);
  const id = 'tpl_' + new Date().getTime();
  sheet.appendRow([
    id, body.label || '', Number(body.amount) || 0,
    body.category || 'lain', body.location || 'rumah', body.note || ''
  ]);
  return jsonResponse({ ok: true, id: id });
}

function deleteTemplate(body) {
  const sheet = getOrCreateSheet(SHEET_TPL, HEADERS_TPL);
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return jsonResponse({ ok: false, error: 'No data' });
  const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  for (let i = 0; i < ids.length; i++) {
    if (ids[i][0] === body.id) {
      sheet.deleteRow(i + 2);
      return jsonResponse({ ok: true });
    }
  }
  return jsonResponse({ ok: false, error: 'Not found' });
}

function setBudget(body) {
  const sheet = getOrCreateSheet(SHEET_BUD, HEADERS_BUD);
  const cat = body.category;
  const limit = Number(body.monthly_limit) || 0;
  if (!cat) return jsonResponse({ ok: false, error: 'No category' });
  
  const lastRow = sheet.getLastRow();
  if (lastRow >= 2) {
    const cats = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
    for (let i = 0; i < cats.length; i++) {
      if (cats[i][0] === cat) {
        if (limit === 0) sheet.deleteRow(i + 2);
        else sheet.getRange(i + 2, 2).setValue(limit);
        return jsonResponse({ ok: true });
      }
    }
  }
  if (limit > 0) sheet.appendRow([cat, limit]);
  return jsonResponse({ ok: true });
}
