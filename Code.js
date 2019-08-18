// For Help goto  https://developers.google.com/apps-script/reference/spreadsheet/sheet
// Use a function that wil be trigered when there is a request made to this Script there are doGet() and doPost() functions.
  
  var sheetName = 'User';
  var sheetId = '1tsb_MKAESDafYsi3C_lhaC0HLu_YyJ0BbxoXv9xkNRA';
  var app = SpreadsheetApp;
  var ss  = app.openById(sheetId);
  var sheet  = ss.getSheetByName("Users");
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();
  var rows = sheet.getRange(2, 1,1,10);
  
  var result = {};  
  result.user = {};
  result.role = {};
  result.library= [];
  result.workshop= {to:"hello", ti: "go"};
  result.courses= {};
 
  
  function makeObject(keys,values){
    var obj = {};
    for(var i=0 ; i< 11 ; i++){
      obj[keys[i]] = values[i];
    }
    Logger.log(obj);
    return obj;
  }
  
  
  function doGet(event){
     
    var heading = sheet.getRange(1,1,1,10).getValues();
    heading = [].concat.apply([],heading);
    Logger.log(heading);
//    
//    Logger.log(result);
    
    var userdetails = rows.getValues();
    userdetails = [].concat.apply([],userdetails);
   result.test = makeObject(heading,userdetails);
    
    if(event.parameter.role == "student"){
      return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    
    if(event.parameter.role == "collaborator"){
      return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    
    if(event.parameter.role == "organisation"){
      return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
}