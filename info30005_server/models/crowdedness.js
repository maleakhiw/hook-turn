var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var today = new Date();
var tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);
var jsonDate = tomorrow.toJSON();

var crowdednessSchema = new Schema({
  runID: String,
  stopID: String,
  crowdednessLevel: String,
  timeReported: {type: Date, default: Date.now() },
  timeExpiry: { type: Date, default: jsonDate },  // TODO implement expiry
  userID: String
});
var Crowdedness = mongoose.model("crowdedness", crowdednessSchema);

module.exports = Crowdedness;
