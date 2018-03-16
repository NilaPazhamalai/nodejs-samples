var fs = require('fs');

//Directory operations
var folderPath = "C:/Users/vennilap/Pictures/tempDir";
var folderPathToReadAfterDelete = "C:/Users/vennilap/Pictures";

var afterFolderCreation = (error) => {
    if (error) {
        return console.error("Error occured in Folder creation " + error.stack);
    }
    return console.log("Folder creation done");
}
console.log("Folder creation start");
fs.mkdir(folderPath, afterFolderCreation);


var folderReadPath = "C:/Users/vennilap/Documents/NodeJs";
var displayFilesOutput = (value, index, array) => {
    console.log('Index: ' + index + ' Name: ' + value);
}

var afterFolderRead = (error, files) => {
    if (error) {
        return console.log("Error occured in Folder read");
    }
    console.log("Folder read done - files below");
    files.forEach(displayFilesOutput);
}
console.log("Folder read start");
fs.readdir(folderReadPath, afterFolderRead);



//remove directory

var folderPathToReadAfterDelete = "C:/Users/vennilap/Pictures";
var folderPathToDelete =  "C:/Users/vennilap/Pictures/tempDirToRemove";
var callAfterDelete = (error) =>{
    if (error) {
        return console.log("Error occured in Folder delete");
    }
    console.log('read Directory after delete : ' + folderPathToReadAfterDelete);
    console.log("Folder read start");
    fs.readdir(folderPathToReadAfterDelete, afterFolderRead);
}

console.log("Folder delete start  "+ folderPathToDelete);
fs.rmdir(folderPathToDelete, callAfterDelete)