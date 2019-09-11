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
  // Query parameter data to function variables
  var userRow = event.parameter.userPointer;
  var roleRow = event.parameter.rolePointer;
  var library = event.parameter.library;
  var role = event.parameter.role;
  var firstColumn = 3;
  // Declare role headings to extract the query parameters
  // store param data into newDataArray[]
  // change columnLength according to the role
  var studentHeading = ['add1', 'add2', 'add3', 'city', 'state', 'pincode', 'mobile', 'altmobile', 'instituteselected', 'institutelisted', 'institute', 'standard', 'interest1', 'interest2', 'interest3', 'dob'];
  var collaboratorHeading = ['add1', 'add2', 'add3', 'city', 'state', 'pincode', 'mobile', 'altmobile', 'instituteselected', 'institutelisted', 'institute', 'collegeselected', 'collegelisted', 'college', 'Degree', 'startdate', 'enddate', 'interest1', 'interest2', 'interest3', 'dob'];
  var instituteHeading = ['add1', 'add2', 'add3', 'city', 'state', 'pincode', 'office', 'officeemail', 'officephone', 'principal', 'principalemail', 'principalphone', 'poc', 'pocemail', 'pocphone'];

  // Variable to store the data recieved from the query param to the array newDataArray[]
  // Update the columnLength according to the role
  var newDataArray = [];
  var columnLength = 1;
  var heading = [];
  var data = [newDataArray];
  var sheet = ss.getSheetByName(role);

  if (role == 'student') {
    columnNames = studentHeading;
    columnLength = 16;
  } else if (role == 'collaborator') {
    columnNames = collaboratorHeading;
    columnLength = 16;
  } else if (role == 'institute') {
    columnNames = instituteHeading;
    columnLength = 16;
  }

  switch (event.parameter.action){
    case "read":{
      break;
    }
    case "update":{
      break;
    }
    case "write":{
      break;
    }
  }

  if (event.parameter.action == "read") {
    // role , requestStatus , userPointer , rolePointer , library
    result.user = getRowData(userRow,firstColumn,columnLength,columnNames, "users");
    result.role = getRowData(roleRow,firstColumn,columnLength,columnNames, role);
    return callBack();
  }

  else if (event.parameter.action == "update") {

    // Looping the newDataArray to get the the param data into the array using the key from heading
    for (i = 0; i < heading.length; i++) {
      newDataArray[i] = event.parameters[heading[i]];
    }

    // Append the data to the sheet row    
    sheet.getRange(roleRow, firstColumn, 1, columnLength).setValues(data);

    // This will generate a data set to be returned to the request start point confirming the update process execution state
    // Generate a metadata confirming te update operation.

  }
  else if (event.parameter.action == "write") {

  }
}

function getRowData(pointer,firstColumn,columnLength,columnNames, targetSheet) {
  var sheet = ss.getSheetByName(targetSheet);
  var rowDataMultiA = sheet.getRange(pointer, firstColumn, 1, columnLength).getValues();
  var rowData = rowDataMultiA[0];
  return makeObject(columnNames, rowData, lastColumn);
}

// This function takes 2 arrays and convert into object with key and value from arrays and return object
function makeObject(keys, values, lastColumn) {
  var obj = {};
  for (i = 0; i < lastColumn; i++) {
    obj[keys[i]] = values[i];
  }
  Logger.log(obj);
  return obj;
}

function callBack() {
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}