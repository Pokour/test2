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
  var firstColumn = 3;

  if (event.parameter.action == "read") {
// role , requestStatus , userPointer , rolePointer , library
    result.user     = getRowData(userRow,"users");
    result.role     = getRowData(roleRow,role);
    return callBack();  
  }

  else if (event.parameter.action == "update") {
// Declare role headings to extract the query parameters || store param data into newDataArray[] || change columnLength according to the role
    var studentHeading = ['add1','add2','add3','city','state','pincode','mobile','altmobile','instituteselected','institutelisted','institute','standard','interest1','interest2','interest3','dob'];
    var collaboratorHeading = ['add1', 'add2', 'add3', 'city', 'state', 'pincode', 'mobile', 'altmobile', 'instituteselected', 'institutelisted', 'institute', 'collegeselected', 'collegelisted', 'college', 'Degree', 'startdate', 'enddate', 'interest1', 'interest2', 'interest3', 'dob'];
    var instituteHeading = ['add1','add2','add3', 'city', 'state', 'pincode', 'office', 'officeemail', 'officephone', 'principal', 'principalemail', 'principalphone', 'poc', 'pocemail', 'pocphone'];

// Variable to store the data recieved from the query param to the array newDataArray[] || Update the columnLength according to the role
    var newDataArray = [];
    var columnLength = 1;

// Checking the role and assingning the key to the heading for the required role || assingning the colum number according to the role
    if(role == 'student'){
      var heading  = studentHeading;
      columnLength = 16;
    }else if (role == 'collaborator'){
      var heading  = collaboratorHeading;
      columnLength = 16;
    }else if (role == 'institute'){
      var heading  = instituteHeading;
      columnLength = 16;
    }

// Looping the newDataArray to get the the param data into the array using the key from heading
    for(i = 0; i< heading.length; i++){
      newDataArray[i] = event.parameters[heading[i]];
    }

// Append the data to the sheet row
    var sheet = ss.getSheetByName(role);
    var data = [newDataArray];    
    sheet.getRange(roleRow,firstColumn,1,columnLength).setValues(data);
    
// This will generate a data set to be returned to the request start point confirming the update process execution state
// Generate a metadata confirming te update operation.

  }
  else if (event.parameter.action == "write") {

  }
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