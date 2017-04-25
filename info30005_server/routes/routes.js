/**
 * copied from Eduardo Velloso on 22/04/2017.
 */

var express = require('express');
var router = express.Router();

var controller = require('../controllers/controller.js');

// Create new cafe
router.post('/api',controller.createData);

// Find all cafes
router.get('/api',controller.findAllData);

// Find one cafe by id
router.get('/api/:id',controller.findOneData);

// Delete one cafe by id
router.delete('/api/:id',controller.deleteOneData);

module.exports = router;
