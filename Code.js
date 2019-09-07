// For Help goto  https://developers.google.com/apps-script/reference/spreadsheet/sheet
// Use a function that wil be trigered when there is a request made to this Script there are doGet() and doPost() functions.

var sheetId = '1tsb_MKAESDafYsi3C_lhaC0HLu_YyJ0BbxoXv9xkNRA';
var app = SpreadsheetApp;
var ss = app.openById(sheetId);

var result = {};

result.user = {};
result.role = {};
result.library = [];
result.workshop = {};
result.courses = {};

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

function getlibraryData(library){
  // Converting the Library Pointer string to an array of integer      
  var strVale = "24,37,41,68";
  var strArr = strVale.split(',');
  var intArr = [];
  var multiObj = [];
  for (i = 0; i < strArr.length; i++) {
    intArr[i] = parseInt(strArr[i]).toFixed(0);
  }
  Logger.log(intArr);
  for(i = 0; i < strArr.length; i++){
    multiObj[i] = getRowData(intArr[i],"library");
  }
  return multiObj;
  
}

function doGet(event) {

  var userRow = event.parameter.userPointer;
  var roleRow = event.parameter.rolePointer;
  var library = event.parameter.library;
  var role    = event.parameter.role;

  if (event.parameter.action == "read") {
    // role , requestStatus , userPointer , rolePointer , library
    result.user     = getRowData(userRow,"users");
    result.role     = getRowData(roleRow,role);
    result.library  = getlibraryData(library);
  }

  else if (event.parameter.action == "update") {

  }
  else if (event.parameter.action == "write") {

  }

  if (event.parameter.role == "student") {
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  if (event.parameter.role == "collaborator") {
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  if (event.parameter.role == "organisation") {
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
}