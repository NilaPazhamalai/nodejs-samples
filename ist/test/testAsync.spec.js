var empModule = require('../src/emp');
var should = require('chai').should();

describe('test async', function () {
    it('find element - 1', function (done) {
        empModule.findOne(1).then((emp) => {
            emp.empName.should.equal("aa");
            done();
        }).catch((err) => {
            done(err);
        });

    });
    it('find element - 5', function (done) {
        empModule.findOne(5).then(() => {
        }).catch((err) => {
            done();
        });

    });

    it('change salary', function (done) {

        empModule.findOne(1).then(async function (empl) {
            var salary = empl.salary;
            try {
                var emp = await empModule.changeSalary(1, 2000);
            } catch (err) {
                done(err);
            }
            emp.salary.should.equal(salary + 2000);
            done();
        }).catch((err) => {
            done(err);
        });
    });
    it('change salary -error', function (done) {

        empModule.findOne(1).then(async function (empl) {
            var salary = empl.salary;
            var emp ;
            try {
                emp = await empModule.changeSalary(9, 2000);
            } catch (err) {
                done();
            }
        }).catch((err) => {
            done(err);
        });
    });
   
});