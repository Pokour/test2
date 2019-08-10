// For Help goto  https://developers.google.com/apps-script/reference/spreadsheet/sheet
// Use a function that wil be trigered when there is a request made to this Script there are doGet() and doPost() functions.

function doGet(event){
var result = {};

// event.parameter.role;
// event.parameter.requestStatus;
// event.parameter.userPointer;
// event.parameter.rolePointer;
// event.parameter.library;

  // Check if the role is granted or not

  // use switch to go to the role

  //access the data from respective sheets and form an object

  
  if(event.parameter.role == "student"){
  result = {0 : "Student recieved"};
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
  }

return ContentService.createTextOutput(result);
}

// using a function to connect to the spreadsheet using predefined functions for sheets

function sheettrigger(sheetName){
  var sheetId = '1tsb_MKAESDafYsi3C_lhaC0HLu_YyJ0BbxoXv9xkNRA'
  var app = SpreadsheetApp;
  var spreadSheet = app.openById(sheetId);
  var workSheet = spreadSheet.getSheetByName(sheetName);
  var dataObj = {};
  
  return ;
}

function log(Argument){
Logger.log('the answer is '+ Argument);
}
