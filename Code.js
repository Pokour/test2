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
function makeObject(keys, values) {
  var obj = {};
  for (var i = 0; i < lastColumn; i++) {
    obj[keys[i]] = values[i];
  }
  Logger.log(obj);
  return obj;
}

function getRowData (pointer, targetSheet){
  let sheet = ss.getSheetByName(targetSheet);
  let lastRow = sheet.getLastRow();
  let lastColumn = sheet.getLastColumn();
  let multiArray = sheet
    .getRange(pointer, 1, 1, lastColumn)
    .getValues();
  rowData = multiArray[0];
  return rowData;
}


function doGet(event) {

  if (event.parameter.action == "read") {
    // role , requestStatus , userPointer , rolePointer , library
    let userRow = event.parameter.userPointer;
    let roleRow = event.parameter.rolePointer;
    let libraryPointer = event.parameter.library;
    let role = event.parameter.role;
    
    let userKey = 

    result.user = makeobject(keys, values);
    
  }

  else if (event.parameter.action == "update") {

  }
  else if (event.parameter.action == "write") {

  }

  // Converting the Library Pointer string to an array of integer      
  var strVale = "130,235,342,124";
  var strArr = strVale.split(',');
  var intArr = [];
  for (i = 0; i < strArr.length; i++) {
    intArr[i] = parseInt(strArr[i]).toFixed(0);
  }
  Logger.log(strArr);
  Logger.log(intArr);




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