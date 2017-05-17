var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  userID: String,
  email: String,
  firstName: String,
  lastName: String
})

var User = mongoose.model('users', userSchema);

module.exports = User;
