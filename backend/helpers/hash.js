var bcrypt = require('bcryptjs');

exports.hash_password = function (passwrd) {

  var salt = bcrypt.genSaltSync(10);
  var hashword = bcrypt.hashSync(passwrd, salt);
  return hashword;
}
  
exports.hash_compare = function (passwrd,hashword) {
	var result = bcrypt.compareSync(passwrd, hashword);  
    return result;
}