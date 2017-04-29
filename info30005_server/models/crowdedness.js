var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var crowdednessSchema = new Schema({
  crowdednessLevel: String
  // runID: Number,
  // stopID: String,
  // timeReported: {type: Date, default: Date.now}
});

var Crowdedness = mongoose.model("Crowdedness", crowdednessSchema);

module.exports = Crowdedness;
