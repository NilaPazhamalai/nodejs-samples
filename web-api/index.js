/* Employee - API endpoints - returns JSON as reponse


GET : http://localhost:8080/api/employees/
POST : http://localhost:8080/api/employees/    {request body: id and name}

GET  :  http://localhost:8080/api/employees/1
PUT : http://localhost:8080/api/employees/1    {request body: id and name}
DELETE : http://localhost:8080/api/employees/1
*/
var serverModule = require("../sample-createServer-module.js")
var viewResolverModule = require("../sample-html-view-resolver-module.js")
var properties = require('./modules/employee-module-properties.js')
var employeeRepo = require('./repository/employeeRepo.js');
var qs = require('querystring');
var UrlPattern = require('url-pattern');

var pattern = new UrlPattern('/api/employees/:id');
var employeeList = [];
employeeList = employeeRepo.initRepo(employeeList);

var reqHandler = (request, response) => {
    var uri = request.url;
    if (request.method && uri) {
        var urlIdObj = pattern.match(uri);
        if (urlIdObj) {
            switch (request.method) {
                case 'GET':
                    viewResolverModule.writeSuccessResponseContent(JSON.stringify(employeeRepo.findOne(urlIdObj.id, employeeList)), response);
                    break;
                case 'PUT':
                    var body = '';
                    request.on('data', (chunk) => {
                        body += chunk;
                    });
                    request.on('end', () => {
                        var data = qs.parse(body);
                        employeeList = employeeRepo.update(urlIdObj.id, employeeRepo.createEmp(data.id, data.name), employeeList);
                        viewResolverModule.writeSuccessResponseContent(JSON.stringify(employeeList), response);
                    });
                    break;
                case 'DELETE':
                    employeeList = employeeRepo.remove(urlIdObj.id, employeeList);
                    viewResolverModule.writeSuccessResponseContent(JSON.stringify(employeeList), response);
                    break;
                default:
                    viewResolverModule.writeSuccessResponseContent(JSON.stringify(employeeList), response);
                    break;
            }
        }
        else {
            switch (request.method) {
                case 'GET':
                    viewResolverModule.writeSuccessResponseContent(JSON.stringify(employeeList), response);
                    break;
                case 'POST':
                    var body = '';
                    request.on('data', (chunk) => {
                        body += chunk;
                    });
                    request.on('end', () => {
                        var data = qs.parse(body);

                        employeeList = employeeRepo.save(employeeRepo.createEmp(data.id, data.name), employeeList);
                        viewResolverModule.writeSuccessResponseContent(JSON.stringify(employeeList), response);
                    });
                    break;
                default:
                    viewResolverModule.writeClientErrorResponseContent(response);
                    break;
            }
        }
    }
    else {
        viewResolverModule.writeClientErrorResponseContent(response);
    }
}
serverModule.createServer(reqHandler, '8080');





