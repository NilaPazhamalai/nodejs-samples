var exportModule = require("./ext-export-module")
var classModule = require("./ext-export-class-module");


// named function imports

var defaultFolderPath = exportModule.defaultFolderPath;
var getDefaultOutputFilePath = exportModule.getDefaultOutputFilePath;
var gettOutputFilePath = exportModule.gettOutputFilePath;

console.log(defaultFolderPath);
console.log(getDefaultOutputFilePath());
console.log(gettOutputFilePath("newFile"));

var Employee = classModule.Employee;

employee1 = new Employee(34,"John");
employee2 = new Employee(54,"Doe");
// named object
newEmp = classModule.newEmployee;


console.log(employee1);
console.log(employee2);
console.log(newEmp);

// anonymous fn import
var anoFn = require("./ext-export-anonymous-fn.js");
anoFn();


