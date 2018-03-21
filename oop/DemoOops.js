var perRef = require('./Person.js');
var accRef = require('./Account.js');
var Account = accRef.Account;
//var Person = perRef.Person;


var acc = new Account("BE454454522",3421,"savings");
var person = new perRef(3421,"John","Doe",32,"12,aa street, CA","john@gmail.com",acc);

console.log(acc);
console.log(person);
console.log(person.company);
console.log(person.getBenefitInfo());
