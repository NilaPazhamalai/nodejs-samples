/* Employee - http://localhost:8080/view
*/
var requestClient = require('request')
var formidable = require('formidable')
var serverModule = require("../sample-createServer-module.js")
var viewResolverModule = require("../sample-html-view-resolver-module.js")
var properties = require('./modules/employee-module-properties.js')
var employeeRepo = require('./repository/employeeRepo.js');
var employeeList = [];

var reqHandler = (request, response) => {
    var uri = request.url;
    if (request.method && uri) {
        if ('/view' == uri) {
            employeeList = employeeRepo.initRepo(employeeList);
            viewResolverModule.resolveViewPage(properties.fileNames.index, response);
        }
        else if (uri.startsWith('/api/')) {
            var reqAction = uri.slice(5, (uri.length));
            switch (reqAction) {
                case properties.url.employeeList:
                    var out = generateListHTML();
                    viewResolverModule.writeSuccessResponseContent(out, response);
                    break;
                case properties.url.addNew:
                    var form = new formidable.IncomingForm();
                    form.parse(request, (error, fields, files) => {
                        if (error) {
                            viewResolverModule.resolveViewPage(properties.fileNames.index, response);
                        } else {
                            var id = fields.id;
                            var name = fields.name;
                            employeeList = employeeRepo.save(employeeRepo.createEmp(id, name), employeeList);
                            viewResolverModule.writeSuccessResponseContent(generateListHTML(), response);
                        }
                    });
                    break;
                case properties.url.remove:
                    var form = new formidable.IncomingForm();
                    form.parse(request, (error, fields, files) => {
                        if (error) {
                            viewResolverModule.resolveViewPage(properties.fileNames.index, response);
                        } else {
                            var id = fields.id;
                            employeeList = employeeRepo.remove(id, employeeList);
                            viewResolverModule.writeSuccessResponseContent(generateListHTML(), response);
                        }
                    });
                    break;
            }
        }
        else if (uri.startsWith('/view/')) {
            var reqPage = uri.slice(6, (uri.length));
            switch (reqPage) {
                case properties.view.list:
                    var out = generateListHTML();
                    viewResolverModule.writeSuccessResponseContent(out, response);
                    // call api end point from here
                    /* requestClient.get('http://localhost:8080/api/employeeList',
                        (error, res) => {
                            if (error) {
                                viewResolverModule.resolveViewPage(properties.fileNames.index, response);
                            } else {
                                console.log(res);
                                viewResolverModule.writeSuccessResponseContent(JSON.stringify(res.body), response);
                            }
                        }); */
                    break;
                case properties.view.addNew:
                    viewResolverModule.resolveViewPage(properties.fileNames.addNew, response);
                    break;
            }

        }
        else {
            viewResolverModule.writeClientErrorResponseContent(response);
        }
    }
}
serverModule.createServer(reqHandler, '8080');


var generateListHTML = () => {
    var output = '';
    output += '<h1> Employee List </h1>';
    output += '<br>';
    output += '<table>';
    output += '<thead><th>NO</th><th>NAME</th><th>ACTIONS</th></thead>';
    output += '<tbody>'
    for (let index = 0; index < employeeList.length; index++) {
        const emp = employeeList[index];
        output += '<TR>';
        output += '<TD>';
        output += emp.id;
        output += '</TD>';
        output += '<TD>';
        output += emp.name;
        output += '</TD>';
        output += '<TD>';
        output += '<form action="/employeeRemove" method="POST">';
        output += '<input type="hidden" name="id" value=' + emp.id + '>';
        output += '<input type="submit" value="delete">';
        output += '</form>';
        output += '</TD>';
        output += '</TR>';
    }
    output += '<br> <a href="/view"> Back </a>';
    return output;
}

 /*
        // request view
        // request api
        else if ('/api/employees' == uri) {
            switch (request.method) {
                case 'GET':
                    viewResolverModule.writeSuccessResponseContent(JSON.stringify(employeeList), response);
                    break;
                case 'POST':
                    var body = '';
                    request.on('data', function (chunk) {
                        body += chunk;
                    });
                    request.on('end', function () {
                        var data = qs.parse(body);
                        // now you can access `data.email` and `data.password`
                        employeeRepo.
                            res.writeHead(200);
                        res.end(JSON.stringify(data));
                    });
                    viewResolverModule.resolveViewPage(properties.fileNames.update, response);
                    break;
                case 'PUT':
                    viewResolverModule.resolveViewPage(properties.fileNames.addNew, response);
                    break;
                case 'DELETE':
                    viewResolverModule.resolveViewPage(properties.fileNames.remove, response);
                    break;
                default:
                    viewResolverModule.resolveViewPage(properties.fileNames.list, response);
                    break;
            }
        }
        else if ('/api/employees/1' == (uri)) {
            viewResolverModule.resolveViewPage(properties.fileNames.detail, response);
        } else if (properties.url.addNew == uri) {
            viewResolverModule.resolveViewPage(properties.fileNames.addNew, response);
        }
        else {
            viewResolverModule.writeClientErrorResponseContent(response);
        }
    }
    */
