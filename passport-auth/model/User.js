var mongoose = require('mongoose');  
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({  
  email: String,
  name: String,
  password: String
});


// methods ======================
// generating a hash
UserSchema.methods.generateHash = async function (password) {
  var pwd = await bcrypt.hash(password, bcrypt.genSaltSync(7), null);
  return pwd;
};

// checking if password is valid
UserSchema.methods.validPassword = async function (password) {
  var valid = await bcrypt.compare(password, this.password);
  return valid;
};

module.exports = mongoose.model('User', UserSchema);