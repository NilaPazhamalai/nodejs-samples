var chai = require('chai');
var should = chai.should();
var User = require('../model/User');
var db = require('../db');


var getUser = async function () {
    try {
        var user1 = await User.findOne({ email: 'user3@sss.com' });
        console.log(user);
        return user1;
    } catch (err) {
        console.log('user nor found to test, Creating new one');
        try {
            var user2 = await User.create({
                email: 'jjj@email.com',
                password: 'jjj',
                name: 'jjj',
            });
            return user2;
        } catch (err) {
            console.log('error Creating new one');
            process.exit(0);
        }

    }
}


describe('to test User schema methods', (done) => {
    it('should generate hash for pwd');
    it('should validate password for logging in', function (done) {
        var user = new User();
        user.name='name';
        user.email = 'dd';
        user.password = 'ee';
        user.validPassword('ee').should.be.true;
        user.validPassword('u ser3').should.be.false;
        user.validPassword('').should.be.false;
        done();
    });
});