const mongoose = require('mongoose');
const bluebird = require('bluebird');

const User = require('./user.js');
const Disruption = require('./disruption.js');
const Crowdedness = require("./crowdedness.js")

module.exports.User = User;
module.exports.Crowdedness = Crowdedness;
module.exports.Disruption = Disruption;

mongoose.Promise = bluebird;

// TODO use mongoLab/personal MongoDB server
mongoose.connect('mongodb://' + process.env.MONGO_USER + ':' + process.env.MONGO_PASS + '@ds123500.mlab.com:23500/hookturns',
  (err) => {
    // TODO use Winston for logging
    if (!err) {
      console.log('Connected to mongo');
    } else {
      console.log('Failed to connect to mongo');
  }
});
