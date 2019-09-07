// For Help goto  https://developers.google.com/apps-script/reference/spreadsheet/sheet
// Use a function that wil be trigered when there is a request made to this Script there are doGet() and doPost() functions.

var sheetId = '1tsb_MKAESDafYsi3C_lhaC0HLu_YyJ0BbxoXv9xkNRA';
var app = SpreadsheetApp;
var ss = app.openById(sheetId);

var result = {};
result.user = {};
result.role = {};
result.library = {};
result.workshop = {};
result.courses = {};

function doGet(event) {

  var userRow = event.parameter.userPointer;
  var roleRow = event.parameter.rolePointer;
  var library = event.parameter.library;
  var role    = event.parameter.role;

  if (event.parameter.action == "read") {
    // role , requestStatus , userPointer , rolePointer , library
    result.user     = getRowData(userRow,"users");
    result.role     = getRowData(roleRow,role);
    
  }

  else if (event.parameter.action == "update") {

  }
  else if (event.parameter.action == "write") {

  }

  return callBack();

}

// This function takes 2 arrays and convert into object with key and value from arrays and return object
function makeObject(keys, values, lastColumn) {
  var obj = {};
  for ( i = 0; i < lastColumn; i++) {
    obj[keys[i]] = values[i];
  }
  Logger.log(obj);
  return obj;
}

function getRowData (pointer, targetSheet) {
  var sheet = ss.getSheetByName(targetSheet);
  var lastColumn = sheet.getLastColumn();
  var rowHeadingMultiA = sheet
    .getRange(1,1,1,lastColumn)
    .getValues();
  var heading = rowHeadingMultiA[0];
  var rowDataMultiA = sheet
    .getRange(pointer, 1, 1, lastColumn)
    .getValues();
  var rowData = rowDataMultiA[0];
  return makeObject(heading,rowData,lastColumn);
}

function callBack (){
  return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
}