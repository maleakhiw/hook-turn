const express = require('express');
const controllers = require('../controllers/controllers');

const router = express.Router();

/* routes */
router.get("/", (req, res) => {
    res.render("index", {pageId: "home"});
});

router.get("/search", (req, res) => {
    res.render("index", {pageId: "search"});
});

router.get("/nextram", controllers.nextram.getPage);

router.get("*", function(req, res) {
    res.render("index", {pageId: "404"});
});

// router.get("/how-it-works", (req, res) => {
//     res.render("index", {pageId: "hiw"});
// });

// router.get("/about", (req, res) => {
//     res.render("index", {pageId: "about"});
// });

// router.get("/route-guide", (req, res) => {
//   var info = require('../PTV/tram_routes/96.json');
//   var route96_stop = info.stops;
//   res.render("index", {
//     pageId: "route_guide",
//     route96Data: route96_stop
//   });
// });

module.exports = router;
