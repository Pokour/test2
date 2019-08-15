// For Help goto  https://developers.google.com/apps-script/reference/spreadsheet/sheet
// Use a function that wil be trigered when there is a request made to this Script there are doGet() and doPost() functions.

function doGet(event){
var result = {};
  
  result.user = {};
  result.role = {add1: "flat 11B",add2: "Jayadarsini Residency"};
  result.library= [];
  result.workshop= {to:"hello", ti: "go"};
  result.courses= {};

  if(event.parameter.role == "student"){
  //result = {0 : "Student recieved"};
  
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  
  if(event.parameter.role == "collaborator"){
  //result = {0 : "Student recieved"};
  
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  
  if(event.parameter.role == "organisation"){
  //result = {0 : "Student recieved"};
  
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

//return ContentService.createTextOutput(result);
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
