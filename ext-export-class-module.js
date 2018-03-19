function Employee(id, name) {
    this.id = id;
    this.name = name;
}

module.exports = {
    Employee : Employee
}

module.exports.newEmployee = new Employee(1,"test");