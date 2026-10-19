const SPREADSHEET_TITLE = "2026手搖飲點餐記錄";
const ORDER_SHEET_NAME = "訂單";
const HEADERS = ["送出時間", "姓名", "訂單明細", "總金額", "杯數", "甜度", "冰量", "備註", "狀態", "訂單編號"];

function setupSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) throw new Error("請先在目標 Google Sheet 的「擴充功能 > Apps Script」中建立此專案。");
  DriveApp.getFileById(spreadsheet.getId()).setName(SPREADSHEET_TITLE);
  let sheet = spreadsheet.getSheetByName(ORDER_SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(ORDER_SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.autoResizeColumns(1, HEADERS.length);
  } else {
    const currentHeaders = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
    if (HEADERS.some((header, index) => currentHeaders[index] !== header)) {
      throw new Error("訂單工作表已有不同標題列；請先確認資料，不會覆寫既有內容。");
    }
  }
  return spreadsheet.getUrl();
}

function doGet(event) {
  const callback = String(event.parameter.callback || "");
  if (!/^[A-Za-z_$][\w$]*$/.test(callback)) {
    return ContentService.createTextOutput("Invalid callback").setMimeType(ContentService.MimeType.TEXT);
  }
  try {
    const sheet = getOrderSheet_();
    const rows = sheet.getLastRow() < 2
      ? []
      : sheet.getRange(2, 1, sheet.getLastRow() - 1, HEADERS.length).getValues();
    const orders = rows.reverse().map(row => ({
      time: row[0] instanceof Date ? Utilities.formatDate(row[0], Session.getScriptTimeZone(), "yyyy/MM/dd HH:mm") : String(row[0] || ""),
      name: String(row[1] || ""),
      details: String(row[2] || ""),
      total: Number(row[3]) || 0,
      status: String(row[8] || "已收到")
    }));
    return jsonp_(callback, { ok: true, orders });
  } catch (error) {
    return jsonp_(callback, { ok: false, error: String(error.message || error) });
  }
}

function doPost(event) {
  const parameters = event.parameter || {};
  const requestId = String(parameters.requestId || "");
  try {
    const name = String(parameters.name || "").trim();
    const items = JSON.parse(parameters.items || "[]");
    const addOns = JSON.parse(parameters.addOns || "[]");
    const total = Number(parameters.total);
    const cups = Number(parameters.cups);
    if (!/^[0-9a-f-]{36}$/i.test(requestId) || !name || !Array.isArray(items) || items.length === 0 || !Number.isSafeInteger(total) || total < 0 || !Number.isSafeInteger(cups) || cups < 1) {
      throw new Error("訂單資料不完整或格式錯誤。");
    }
    const details = items.map(item => `${String(item.name)}（${String(item.size)}）× ${Number(item.quantity)} 杯`).join("\n")
      + (addOns.length ? `\n加料：${addOns.map(String).join("、")}` : "");
    const sheet = getOrderSheet_();
    sheet.appendRow([
      new Date(),
      name,
      details,
      total,
      cups,
      String(parameters.sweetness || ""),
      String(parameters.ice || ""),
      String(parameters.note || ""),
      "已收到",
      requestId
    ]);
    return postResult_(requestId, true, "");
  } catch (error) {
    return postResult_(requestId, false, String(error.message || error));
  }
}

function getOrderSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet && spreadsheet.getSheetByName(ORDER_SHEET_NAME);
  if (!sheet || sheet.getLastRow() === 0) throw new Error("找不到訂單工作表，請先在 Apps Script 執行 setupSheet。");
  return sheet;
}

function jsonp_(callback, data) {
  return ContentService.createTextOutput(`${callback}(${JSON.stringify(data)});`)
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function postResult_(requestId, ok, error) {
  const response = JSON.stringify({ requestId, ok, error }).replace(/</g, "\\u003c");
  const html = `<script>window.parent.postMessage(${response}, "*");</script>`;
  return HtmlService.createHtmlOutput(html);
}
