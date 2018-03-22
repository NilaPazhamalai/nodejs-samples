function Account(IBAN, personNo , type){
    this.IBAN = IBAN;
    this.personNo=personNo;
    this.type = type;
}

Account.prototype.getFormattedIBAN = function(){
    return this.IBAN;
}


module.exports = {
   Account : Account
}