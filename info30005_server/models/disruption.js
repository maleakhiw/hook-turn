var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var today = new Date();
var tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);
var jsonDate = tomorrow.toJSON();

var disruptionSchema = new Schema({
  status: String,
  runID: {type: Number},
  stopID: {type: Number},
  disruption: String,
  timeReported: { type: Date, default: Date.now() },
  timeExpiry: { type: Date, default: jsonDate },  // TODO implement expiry
  userID: String
});
var Disruption = mongoose.model('Disruption', disruptionSchema);

module.exports = Disruption;
