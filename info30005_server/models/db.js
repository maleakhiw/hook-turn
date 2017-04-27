// Create database
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/myappdatabase',function(err){

    if(!err){
        console.log('Connected to mongo');
    }else{
        console.log('Failed to connect to mongo');
    }
});

var User = require('./user.js');
var Disruption = require('./disruption.js');

module.exports.User = User;
module.exports.Disruption = Disruption;
