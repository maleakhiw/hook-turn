/**
 * copied from Eduardo Velloso on 22/04/2017.
 */

var express = require('express');
var router = express.Router();

var controller = require('../controllers/controller.js');

// Create new disruption
router.post('/reportdisruption',controller.createDisruption);
// Find all disruptions
router.get('/reportdisruption',controller.findAllDisruption);
// Find one disruption by id
router.get('/reportdisruption/:id',controller.findOneDisruption);
// Find one disruption and update by id
router.post('/reportdisruption/:id',controller.findOneAndUpdateDisruption);
// Delete one disruption by id
router.delete('/reportdisruption/:id',controller.deleteOneDisruption);

module.exports = router;
