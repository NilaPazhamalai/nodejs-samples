var fs = require('fs');

var resolveViewPage = (htmlFileName, response) => {
    fs.readFile(htmlFileName, (error, data) => {
        if (error) { // to differentiate error - incorrect file name or server error - TODO
            console.log('error occured in reading input html file');
            writeServerErrorResponseContent(response);
        } else {
            writeSuccessResponseContent(data.toString(),response);
        }
    });
}


var writeSuccessResponseContent = (output, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(output);
    response.end();
}
var writeClientErrorResponseContent = (response) => {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.end();
}
var writeServerErrorResponseContent = (response) => {
    response.writeHead(500, { 'Content-Type': 'text/html' });
    response.write('server error');
    response.end();
}



module.exports = {
    writeSuccessResponseContent : writeSuccessResponseContent,
    writeClientErrorResponseContent: writeClientErrorResponseContent,
    writeServerErrorResponseContent : writeServerErrorResponseContent,
    resolveViewPage : resolveViewPage
}
