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
module.exports = {
    afterFolderRead : afterFolderRead,
    displayFilesOutput : displayFilesOutput
}