// Create database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myappdatabase',function(err){
    if(!err){
        console.log('Connected to mongo');
    }else{
        console.log('Failed to connect to mongo');
    }
});

require('./user.js');
require('./disruption.js');
