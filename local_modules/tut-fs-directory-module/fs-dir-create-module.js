var afterFolderCreation = (error) => {
    if (error) {
        return console.error("Error occured in Folder creation " + error.stack);
    }
    return console.log("Folder creation done");
}

module.exports = {
    afterFolderCreation: afterFolderCreation
}