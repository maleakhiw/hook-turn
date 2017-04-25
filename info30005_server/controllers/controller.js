/**
 * Created by Eduardo Velloso on 10/04/2017.
 */
var mongoose = require('mongoose');
var User = mongoose.model('User');

var createData = function(req,res){
    var user = new User({
        "username":req.body.username,
        "data":req.body.data
    });

    user.save(function(err,newUser){
        if(!err){
            res.send(newUser);
        }else{
            res.sendStatus(400);
        }
    });
};

var findAllData = function(req,res){
    User.find(function(err,users){
        if(!err){
            res.send(users);
        }else{
            res.sendStatus(404);
        }
    });
};

var findOneData = function(req,res){
    var userInx = req.params.id;
    User.findById(userInx,function(err,user){
        if(!err){
            res.send(user);
        }else{
            res.sendStatus(404);
        }
    });
};

var deleteOneData = function(req,res){
    var userInx = req.params.id;
    User.findByIdAndRemove(userInx,function(err,user){
        if(!err){
            res.send(user);
        }else{
            res.sendStatus(404);
        }
    });
};

module.exports.createData = createData;
module.exports.findAllData = findAllData;
module.exports.findOneData = findOneData;
module.exports.deleteOneData = deleteOneData;
