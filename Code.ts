// For Help goto  https://developers.google.com/apps-script/reference/spreadsheet/sheet
// Use a function that wil be trigered when there is a request made to this Script there are doGet() and doPost() functions.

function doGet(){
log(sheettrigger('Library'));

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
