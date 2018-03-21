function Account(IBAN, personNo , type){
    this.IBAN = IBAN;
    this.personNo=personNo;
    this.type = type;
}

Account.prototype.getFormattedIBAN = ()=>{
    return this.IBAN;
}


module.exports = {
   Account : Account
}