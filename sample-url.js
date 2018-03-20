/* URL parsing -  */
var url = require('url');
var serverModule = require("./sample-createServer-module.js");
var viewResolverModule = require("./sample-html-view-resolver-module.js");

var requestListener = (request, response) => {
    var parsedUrl = url.parse(request.url, true);
    var query = parsedUrl.query;
    var fileName = './' + query.month + query.year + '.txt';
    console.log('---------------------------------');
    console.log('URL path: ' + parsedUrl.pathname);
    console.log('URL search criteria: ' + parsedUrl.search);
    console.log('File Name :' + fileName);

    if ('/url/'== parsedUrl.pathname && fileName) {
        viewResolverModule.resolveViewPage(fileName,response);
    } else {
        viewResolverModule.writeClientErrorResponseContent(response);
    }
}

serverModule.createServer(requestListener,8080);
