var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  data: String
});

var crowdednessSchema = new Schema({
  crowdednessLevel: String
});

var Crowdedness = mongoose.model("Crowdedness", crowdednessSchema);
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports.User = User;
module.exports.Crowdedness = Crowdedness;
