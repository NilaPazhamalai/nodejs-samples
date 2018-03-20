var viewResolverModule = require("./sample-html-view-resolver-module.js")
var fs = require('fs');
module.exports.urlProperties = {
    urlInput: '/fileInput',
    urlUpload: '/fileUpload'
}

module.exports.htmlProperties = {
    inputHtmlFileName: './fileUpload.html',
    processHtmlFileName: './fileProcess.html',
    errorHtmlFileName: './fileUploadError.html'
}

module.exports.filePath = {
    upload: 'C:/Users/vennilap/uploadedFiles/'
}

var uploadFile = (oldPath, newPath, successView, errorView, response) => {
    fs.rename(oldPath, newPath, (error) => {
        return error ?
            viewResolverModule.resolveViewPage(errorView, response) : viewResolverModule.resolveViewPage(successView, response);
    }
    )
};
module.exports.uploadFile = uploadFile;