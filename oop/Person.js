//constructor

//fields in constructor are object specific
function Person(id,firstName,lastName,age,address,email,principalAccount){
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.address = address;
    this.email = email;
    this.principalAccount = principalAccount;
}

//fields in prototype are class specific - can be accessed via object name too!!!!
Person.prototype.company = "ABC Company";


//methods - class specific - same as java
Person.prototype.getFullName = ()=>{
    return [this.firstName,this.lastName].join(" ");
}

Person.prototype.getBaseSalary = ()=>{
    if(this.age>25 && this.age<40){
        return 15000;
    }else{
        return 20000;
    }
}

Person.prototype.getBenefitInfo = ()=>{
    var info = 'Base salary is '+ 
                ' ' + 'Deposited into account: '+principalAccount.getFormattedIBAN();
    return info;
}

module.exports = Person;
/* 
module.exports = {
    Person : Person,
    getBenefitInfo : getBenefitInfo
} */

