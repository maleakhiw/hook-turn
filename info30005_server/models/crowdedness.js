var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var crowdednessSchema = new Schema({
  runID: String,
  stopID: String,
  crowdednessLevel: String,
  timeReported: {type: Date, default: Date.now() }
});

var Crowdedness = mongoose.model("crowdedness", crowdednessSchema);

module.exports = Crowdedness;
