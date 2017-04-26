// Create database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tram_db',function(err){
    if(!err){
        console.log('Connected to mongo');
    }else{
        console.log('Failed to connect to mongo');
    }
});

require('./user.js');
