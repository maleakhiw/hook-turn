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
  crowdSourcedDisruptions: [String],
  timeReported: { type: Date, default: Date.now() },
  timeExpiry: { type: Date, default: jsonDate }
});

var Disruption = mongoose.model('Disruption', disruptionSchema);

// make this available { type: Date, default: Date.now }to our users in our Node applications
module.exports = Disruption;
