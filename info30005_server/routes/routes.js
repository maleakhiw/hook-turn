/**
 * copied from Eduardo Velloso on 22/04/2017.
 */

var express = require('express');
var router = express.Router();

var controller = require('../controllers/controller.js');

// Create new cafe
router.post('/reportdisruption',controller.createDisruption);

// Find all cafes
router.get('/reportdisruption',controller.findAllDisruption);

// Find one cafe by id
router.get('/reportdisruption/:id',controller.findOneDisruption);

// Delete one cafe by id
router.delete('/reportdisruption/:id',controller.deleteOneDisruption);

module.exports = router;
