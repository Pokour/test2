// For Help goto  https://developers.google.com/apps-script/reference/spreadsheet/sheet
// Use a function that wil be trigered when there is a request made to this Script there are doGet() and doPost() functions.
  
  var sheetName = 'users';
  var sheetId = '1tsb_MKAESDafYsi3C_lhaC0HLu_YyJ0BbxoXv9xkNRA';
  var app = SpreadsheetApp;
  var ss  = app.openById(sheetId);
  var sheet  = ss.getSheetByName(sheetName);
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();
  var rows = sheet.getRange(2, 1,1,lastColumn);
  
  var result = {};  
  result.user = {};
  result.role = rows.getValues();
  result.library= [];
  result.workshop= {to:"hello", ti: "go"};
  result.courses= {};
 
  // This function takes 2 arrays and convert into object with key and value from arrays and return object
  function makeObject(keys,values){
    var obj = {};
    for(var i=0 ; i<lastColumn ; i++){
      obj[keys[i]] = values[i];
    }
    Logger.log(obj);
    return obj;    
  }
  
  
  function doGet(event){
    // This gets the data from sheet as a multi array using sheet.getRange(row, column, numRows, numColumns) 
    var heading = sheet.getRange(1,1,1,lastColumn).getValues();
    heading = [].concat.apply([],heading);
    
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