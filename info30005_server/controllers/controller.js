/**
 * Created by Eduardo Velloso on 10/04/2017.
 */
var mongoose = require('mongoose');
var Disruption = mongoose.model('Disruption');

var createDisruption = function(req,res){
    var disruption = new Disruption({
      "status": req.body.status,
      "runID": req.body.runID,
      "stopID": req.body.stopID,
      "crowdSourcedDisruptions": req.body.crowdSourcedDisruptions
    });

    disruption.save(function(err,newDisruption){
        if(!err){
            res.send(newDisruption);
        }else{
            res.sendStatus(400);
        }
    });
};

var findAllDisruption = function(req,res){
    Disruption.find(function(err,disruptions){
        if(!err){
            res.send(disruptions);
        }else{
            res.sendStatus(404);
        }
    });
};

var findOneDisruption = function(req,res){
    var disruptionInx = req.params.id;
    Disruption.findById(disruptionInx,function(err,disruption){
        if(!err){
            res.send(disruption);
        }else{
            res.sendStatus(404);
        }
    });
};

var findOneAndUpdateDisruption = function(req,res){
    var disruptionInx = req.params.id;
    Disruption.findByIdAndUpdate(disruptionInx,
      {
        $push:
        {
          "crowdSourcedDisruptions": req.body.crowdSourcedDisruptions
        }
      },
      {safe: true, upsert: true},
      function(err,disruption){
        if(!err){
            ////////////
            res.send(disruption);
        }else{
            res.sendStatus(404);
        }
    });
};

var deleteOneDisruption = function(req,res){
    var disruptionInx = req.params.id;
    Disruption.findByIdAndRemove(disruptionInx,function(err,disruption){
        if(!err){
            res.send(disruption);
        }else{
            res.sendStatus(404);
        }
    });
};

module.exports.createDisruption = createDisruption;
module.exports.findAllDisruption = findAllDisruption;
module.exports.findOneDisruption = findOneDisruption;
module.exports.findOneAndUpdateDisruption = findOneAndUpdateDisruption;
module.exports.deleteOneDisruption = deleteOneDisruption;
