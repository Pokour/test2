// For Help goto  https://developers.google.com/apps-script/reference/spreadsheet/sheet
// Use a function that wil be trigered when there is a request made to this Script there are doGet() and doPost() functions.
  
  var sheetName = 'users';
  var sheetId = '1tsb_MKAESDafYsi3C_lhaC0HLu_YyJ0BbxoXv9xkNRA';
  var app = SpreadsheetApp;
  var ss  = app.openById(sheetId);
  var sheet  = ss.getSheetByName(sheetName);
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();
  var rows = sheet.getRange(2, 1, 1, lastColumn);
  
  var result = {};  
  result.user = {};
  result.role = {};
  result.library= [];
  result.workshop= {};
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
    var headingMultiarray = sheet.getRange(1, 1, 1, lastColumn).getValues();
    heading = headingMultiarray[0];

    var userdetailsMultiarray = sheet.getRange(2, 1, 1, lastColumn).getValues();
    userdetails = userdetailsMultiarray[0];
    Logger.log(userdetails);
    result.test = makeObject(heading, userdetails);
    
    // Converting the Library Pointer string to an array of integer
      
    var strVale = "130,235,342,124";
    var strArr = strVale.split(',');
    var intArr = [];
    for(i=0; i < strArr.length; i++){
      intArr[i] = parseInt( strArr[i] ).toFixed(0) ;
      }
      Logger.log(strArr);
      Logger.log(intArr);


    if(event.parameter.action == "read"){
      // role , requestStatus , userPointer , rolePointer , library

      
    }
    else if(event.parameter.action == "update"){

    }
    else if(event.parameter.action == "write"){

    }

    if (event.parameter.role == "student") {
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