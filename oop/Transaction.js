function Transaction(id, sourceAccount, targetAccount, amount, date){
    this.id = id;
    this.sourceAccount = sourceAccount;
    this.targetAccount = targetAccount;
    this.amount = amount;
    this.date = date;
}

module.exports= {
    Transaction : Transaction
}