const express = require("express");
const bodyParser = require('body-parser');
const router = require('./routes/router');

// Express.js configuration
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/* static files */
app.use(express.static("assets"));
app.use('/nextramlive', express.static("nextram-angular/dist"));
app.use(router);

let port = 3000;  // TODO env.port
app.listen(port, () => {
  console.log('H/T> Listening on port ' + port + '.')
});
