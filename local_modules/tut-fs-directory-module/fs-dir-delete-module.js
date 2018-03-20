var callAfterDelete = (error) =>{
    if (error) {
        return console.log("Error occured in Folder delete");
    }
    console.log('read Directory after delete : ' + folderPathToReadAfterDelete);
    console.log("Folder read start");
    fs.readdir(folderPathToReadAfterDelete, afterFolderRead);
}

module.exports = {
    callAfterDelete : callAfterDelete
}