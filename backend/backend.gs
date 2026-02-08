/**
 * Genesis Attendance Management System
 * Backend – Google Apps Script
 *
 * Features:
 * - Search participants by ID or name
 * - Mark attendance
 * - Edit participant details
 * - Export registered participants as CSV
 * - Activity logging (check-in, edit, export, reset)
 *
 * Note:
 * This backend is designed to work with a Google Spreadsheet
 * and is accessed from the frontend using google.script.run
 */

const SHEET_NAME = "Form Responses 1";
/* Serve HTML or background image */
function doGet(e) {
  if (e && e.parameter && e.parameter.bg === "1") {
    const fileId = "1SovZ-jfyK0mrUxUT6LKCdQg9GrZ41h7g";
    const file = DriveApp.getFileById(fileId);
    const blob = file.getBlob();
    return ContentService.createBinaryOutput(blob)
      .setMimeType(blob.getContentType());
  }

  return HtmlService.createHtmlOutputFromFile("Form Responses 1")  // Ensure your HTML file is named "Index.html"
    .setTitle("GENESIS'25")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);  // FIXED HERE
}

/* Search participant */
function searchParticipant(query) {
  const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    const id = data[i][1].toString().toLowerCase();
    const name = data[i][2].toLowerCase();

    if (id === query.toLowerCase() || name.includes(query.toLowerCase())) {
      return {
        row: i + 1,
        participant: {
          id: data[i][1],
          name: data[i][2],
          degree: data[i][3],
          email: data[i][4],
          whatsapp: data[i][5],
          lunch: data[i][6],
          payment: data[i][7],
          district: data[i][8],
          registered: data[i][9]
        }
      };
    }
  }
  return null;
}

/* Mark registered */
function markRegistered(row) {
  const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);
  const status = sheet.getRange(row, 10); // Column J
  const idCell = sheet.getRange(row, 2);   // Column B: ID
  const nameCell = sheet.getRange(row, 3); // Column C: Name

  if (status.getValue() === "Yes") {
    return { error: "ALREADY", count: getAttendanceCount() };
  }

  status.setValue("Yes");
  sheet.getRange(row, 11).setValue(new Date());

  logActivity("CHECK-IN", idCell.getValue(), nameCell.getValue(), "Participant checked in");

  return { success: true, count: getAttendanceCount() };
}

/* Attendance count */
function getAttendanceCount() {
  const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);
  const values = sheet.getRange(2, 10, sheet.getLastRow() - 1 || 1, 1).getValues();
  return values.filter(r => r[0] === "Yes").length;
}

/* Save edited record */
function saveRecord(row, u) {
  const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);

  sheet.getRange(row, 3).setValue(u.name);
  sheet.getRange(row, 4).setValue(u.degree);
  sheet.getRange(row, 5).setValue(u.email);
  sheet.getRange(row, 6).setValue(u.whatsapp);
  sheet.getRange(row, 9).setValue(u.district);

  logActivity("EDIT", u.id, u.name, "Record updated");
  return true;
}

/* Export registered participants */
function exportRegistered() {
  const ss = SpreadsheetApp.getActive();
  const sheet = ss.getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();

  const out = [data[0]]; // headers
  for (let i = 1; i < data.length; i++) {
    if (data[i][9] === "Yes") out.push(data[i]);
  }

  const csv = out.map(r => r.map(c => `"${(c || '').toString().replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = Utilities.newBlob(csv, "text/csv", "Registered_Participants.csv");

  logActivity("EXPORT", "System", "Admin", "Exported all registered participants");

  return {
    mimeType: blob.getContentType(),
    data: Utilities.base64Encode(blob.getBytes()),
    filename: blob.getName()
  };
}

/* Reset attendance */
function resetAttendance() {
  const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);
  const lr = sheet.getLastRow();

  if (lr > 1) {
    sheet.getRange(2, 10, lr - 1, 2).clearContent();
  }

  logActivity("RESET", "System", "Admin", "All attendance reset");
  return 0;
}

/* Get activity history - improved */
function getActivityHistory() {
  const ss = SpreadsheetApp.getActive();
  const logSheet = ss.getSheetByName("Activity Log");

  if (!logSheet || logSheet.getLastRow() <= 1) {
    return [];
  }

  const data = logSheet.getRange(2, 1, logSheet.getLastRow() - 1, 5).getValues();

  return data
    .sort((a, b) => new Date(b[0]) - new Date(a[0])) // newest first
    .slice(0, 30)
    .map(row => ({
      time: row[0],
      action: row[1],
      id: row[2],
      name: row[3],
      details: row[4]
    }));
}

/* Activity log - robust */
function logActivity(action, id, name, details) {
  const ss = SpreadsheetApp.getActive();
  let logSheet = ss.getSheetByName("Activity Log");

  if (!logSheet) {
    logSheet = ss.insertSheet("Activity Log");
    logSheet.appendRow(["Timestamp", "Action", "ID", "Name", "Details"]);
    logSheet.setFrozenRows(1);
  }

  logSheet.appendRow([
    new Date(),
    action || "UNKNOWN",
    id || "-",
    name || "-",
    details || ""
  ]);
}
