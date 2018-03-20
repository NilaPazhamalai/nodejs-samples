/* Employee - http://localhost:8080/api/
*/
var serverModule = require("../sample-createServer-module.js")
var viewResolverModule = require("../sample-html-view-resolver-module.js")
var properties = require('./modules/employee-module-properties.js')
var employeeList = [];
var employeeRepo = require('./repository/employeeRepo.js');

var reqHandler = (request, response) => {
    var uri = request.url;
    if (request.method && uri) {
        if ('/api/' == uri || '/api/index' == uri) {
            employeeList = employeeRepo.initRepo(employeeList);
            viewResolverModule.resolveViewPage(properties.fileNames.index, response);
        }
        else if ('/api/employees' == uri) {
            switch (request.method) {
                case 'GET':
                    viewResolverModule.writeSuccessResponseContent(JSON.stringify(employeeList), response);
                    break;
                case 'POST':
                var body = '';
                request.on('data', function(chunk) {
                  body += chunk;
                });
                request.on('end', function() {
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
        }else if (properties.url.addNew == uri){
            viewResolverModule.resolveViewPage(properties.fileNames.addNew, response);
        }
        else {
            viewResolverModule.writeClientErrorResponseContent(response);
        }
    }
    else {
        viewResolverModule.writeClientErrorResponseContent(response);
    }
}
serverModule.createServer(reqHandler, '8080');





