var empStub = require('./empStub');

var findOne = (no)=> {
    return new Promise((resolve, reject) => {
        var emp = empStub.find((emp) => {
            return emp.empNo == no
        });
        if (emp) {
            resolve(emp);
        } else {
            reject(new Error('not found'));
        }
    });
}
exports.changeSalary = async (empNo, newSalary) => {
    try {
        var emp = await findOne(empNo);
        var index = await empStub.indexOf(emp);
        emp.salary = emp.salary + newSalary;
        return await empStub.fill(emp, index, 1)[index];
    } catch (err) {
        throw err;
    }
}

exports.findOne = findOne;