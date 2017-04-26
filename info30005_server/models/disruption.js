var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var disruptionSchema = new Schema({
  status: String,
  runID: {type: Number},
  stopID: {type: Number},
  crowdSourcedDisruptions: [String],
  timeReported: {type: Date, default: Date.now},
  timeExpiry: { type: Date, default: Date.now }
});

var Disruption = mongoose.model('Disruption', disruptionSchema);

// make this available { type: Date, default: Date.now }to our users in our Node applications
module.exports = Disruption;
