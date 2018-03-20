/* File Upload - http://localhost:8080/fileInput
*/
var formidable = require('formidable');
var url = require('url');
var serverModule = require("./sample-createServer-module.js")
var fileUploadModule = require("./sample-file-upload-module.js")
var viewResolverModule = require("./sample-html-view-resolver-module.js")


var reqHandler = (request, response) => {
    if (fileUploadModule.urlProperties.urlInput == request.url) {
        viewResolverModule.resolveViewPage(fileUploadModule.htmlProperties.inputHtmlFileName, response);
    } else
        if (fileUploadModule.urlProperties.urlUpload == request.url) {
            // process file
            var form = new formidable.IncomingForm();
            form.parse(request, (error, fields, files) => {
                var oldPath = files.fileToUpload.path;
                var newPath = fileUploadModule.filePath + files.fileToUpload.name;
                var fileUploadSuccess = fileUploadModule.uploadFile(oldPath, newPath, fileUploadModule.htmlProperties.processHtmlFileName, fileUploadModule.htmlProperties.errorHtmlFileName, response)
            });

        }
}
serverModule.createServer(reqHandler, '8080');









