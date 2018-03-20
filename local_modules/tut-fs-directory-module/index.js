var readDirModule = require('./fs-dir-read-module.js');
var createDirModule = require('./fs-dir-create-module.js');
var deleteDirModule = require('./fs-dir-delete-module.js');


module.exports = {
    afterFolderRead : readDirModule.afterFolderRead,
    displayFilesOutput : readDirModule.displayFilesOutput,
    afterFolderCreation: createDirModule.afterFolderCreation,
    callAfterDelete : deleteDirModule.callAfterDelete
}