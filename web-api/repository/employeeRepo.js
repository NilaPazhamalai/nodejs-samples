var empRef = require('../model/Employee.js');
var Employee = empRef.Employee;




var initRepo = (employeeList) => {
        var emp = new Employee();
        emp.id = '1';
        emp.name = 'John';
        employeeList.push(emp);
        return employeeList;
}

var findOne = (id, employeeList) => {
    for (let index = 0; index < employeeList.length; index++) {
        const emp = employeeList[index];
        if (id === emp.id){
            console.log(emp);
            return emp;
        }
    }
    return new Employee("","");
}

var createEmp = (id,name) => {
    return new Employee(id,name);
}

var save = (employee, employeeList) => {
    employeeList.push(employee);
    return employeeList;
}

var update = (id, employee, employeeList) => {
    for (let index = 0; index < employeeList.length; index++) {
        const emp = employeeList[index];
        if (id === emp.id){
            console.log(emp);
            employeeList[index] = employee;
        }
    }
    return employeeList;
}

var remove = (id, employeeList) => {
    for (let index = 0; index < employeeList.length; index++) {
        const emp = employeeList[index];
        if (id === emp.id){
            console.log(emp);
            employeeList.splice(index, 1);
        }
    }
    return employeeList;
    
}

module.exports = {
    initRepo : initRepo,
    findOne : findOne,
    save : save,
    update : update,
    remove : remove,
    createEmp : createEmp
}