/*
author: Utsav Singh | email address | Contact Number
Accepts GET request from WebApps using query parameters.
1. Check for the role type: [student / collaborator / institution]
2. updates global variables from the recieved data from query params.
3. check for the action type from the query parameters action = [read / update / write]
4. Logic to prform the required action on the sheet data.
5. make an object with the return data to the WebApp using contentService()
*/

// Defining all the Global variables
var result = { users: {}, role: {}, workshop: {}, courses: {} };

// Column names for differeny roles stored as array
var studentHeading =
  ['add1', 'add2', 'add3', 'city', 'state', 'pincode', 'mobile', 'altmobile', 'instituteselected', 'institutelisted', 'institute',
    'standard', 'interest1', 'interest2', 'interest3', 'dob'];
var collaboratorHeading =
  ['add1', 'add2', 'add3', 'city', 'state', 'pincode', 'mobile', 'altmobile', 'instituteselected', 'institutelisted', 'institute',
    'collegeselected', 'collegelisted', 'college', 'Degree', 'startdate', 'enddate', 'interest1', 'interest2', 'interest3', 'dob'];
var instituteHeading =
  ['add1', 'add2', 'add3', 'city', 'state', 'pincode', 'office', 'officeemail', 'officephone', 'principal', 'principalemail',
    'principalphone', 'poc', 'pocemail', 'pocphone'];
var userHeaading = [];

var userRow = 0;
var roleRow = 0;
var roleRecieved;
var actionRequested;
var library;

var sheetId = '1tsb_MKAESDafYsi3C_lhaC0HLu_YyJ0BbxoXv9xkNRA';
var app = SpreadsheetApp;
var ss = app.openById(sheetId);
var sheet = ss.getSheetByName("users");

var heading = [];
var firstColumn;
var headLength;

//********************************************* doGet() STARTS HERE ********************************************* 
function doGet(event) {

  updateParameters(event);

  updateRoleParametrs(roleRecieved);

  takeAction(event);

  return callBack();

}
//********************************************* doGet() ENDS HERE ********************************************* 

function updateParameters(event) {
  userRow = event.parameter.userPointer;
  roleRow = event.parameter.rolePointer;
  roleRecieved = event.parameter.role;
  actionRequested = event.parameter.action;
  library = event.parameter.library;
}

function updateRoleParametrs(roleRecieved) {
  if (roleRecieved == "student") {
    heading = studentHeading;
    firstColumn = 3;
    headLength = heading.length;
  } else if (roleRecieved == "collaborator") {
    heading = collaboratorHeading;
    firstColumn = 3;
    headLength = heading.length;
  } else if (roleRecieved == "institute") {
    heading = instituteHeading;
    firstColumn = 3;
    headLength = heading.length;
  }
}

function takeAction(event) {
  if (actionRequested == "read") {
    readFromSheet();
  } else if (actionRequested == "update") {
    updateSheet(event);
  } else if (actionRequested == "write") {
    writeToSheet(event);
    Logger.log("WRITE ACTION")
  }
}

function readFromSheet() {
  result.users = getRowData(userRow, "users");
  result.role = getRowData(roleRow, roleRecieved);
}

function getRowData(pointer, targetSheet) {
  sheet = ss.getSheetByName(targetSheet);
  var tempMultiArray = sheet.getRange(pointer, firstColumn, 1, headLength).getValues();
  var simpleArray = tempMultiArray[0];
  return makeObject(heading, simpleArray);
}

// This function takes 2 arrays and convert into object with key and value from arrays and return object
function makeObject(keys, values) {
  var obj = {};
  for (i = 0; i < headLength; i++) {
    obj[keys[i]] = values[i];
  }
  Logger.log(obj);
  return obj;
}

function updateSheet(event) {
  var temp = [];
  var dataarray = [[]];
  for (i = 0; i < headLength; i++) {
    temp[i] = event.parameter[heading[i]];
  }
  dataarray[0] = temp;
  sheet = ss.getSheetByName(roleRecieved);
  sheet.getRange(roleRow, firstColumn, 1, headLength).setValues(dataarray);
}

function writeToSheet(event) {  
  writeToUser (event);
  writeTorole (event);
}

function writeToUser (event) {
  var ulength = userHeaading.length;
  var temp=[];
  var dataarray=[[]];
  for(i=0 ; i < ulength ; i++ ) {
   temp[i] = event.parameter[userHeaading[i]];
  }
  dataarray[0] = temp;
  sheet = ss.getSheetByName("users");
  var lastRow = sheet.getLastRow();
  sheet.getRange(lastRow, firstColumn, 1, ulength).setValues(dataarray);
  
  
}

function writeTorole (event) {
  var rlength = headLength;
  var temp = [];
  var dataarray = [[]];
  for(i=0 ; i < rlength ; i++) {
    temp[i] = event.parameter[heading[i]];
  }
  dataarray[0] = temp;
  sheet = ss.getSheetByName(roleRecieved);
  var lastRow = sheet.getLastRow();
  sheet.getRange(lastRow, firstColumn, 1, rlength).setValues(dataarray);
}

function callBack() {
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}