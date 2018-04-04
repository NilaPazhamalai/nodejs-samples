/* 'use strict';

module.exports = function (app) {
    var User = app.models.User;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;

    User.create([
        { username: 'Jana', email: 'jana@doe.com', password: '1234' },
        { username: 'Anu', email: 'anu@doe.com', password: '1234' },
        { username: 'Suri', email: 'suri@abc.com', password: '1234' } //ADMIN
    ], function (err, users) {
        if (err) throw (err);

        //create the admin role
        Role.create({
            name: 'admin'
        }, function (err, role) {
            if (err) throw (err);

            //make bob an admin
            role.principals.create({
                principalType: RoleMapping.USER,
                principalId: users[2].id
            }, function (err, principal) {
                throw(err);
            });
        });
    });

} */