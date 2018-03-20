var fs = require('fs');
var dirOprModule = require('fs-dir-module');

//Directory operations
var folderPath = "C:/Users/vennilap/Pictures/tempDir";
var folderPathToReadAfterDelete = "C:/Users/vennilap/Pictures";

console.log("Folder creation start");
fs.mkdir(folderPath, dirOprModule.afterFolderCreation);

var folderReadPath = "C:/Users/vennilap/Documents/NodeJs";
console.log("Folder read start");
fs.readdir(folderReadPath, dirOprModule.afterFolderRead);

var folderPathToReadAfterDelete = "C:/Users/vennilap/Pictures";
var folderPathToDelete =  "C:/Users/vennilap/Pictures/tempDirToRemove";
console.log("Folder delete start  "+ folderPathToDelete);
fs.rmdir(folderPathToDelete, dirOprModule.callAfterDelete)