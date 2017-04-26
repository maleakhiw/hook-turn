var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  data: String
});


var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;
