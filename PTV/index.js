var express = require('express');
var app = express();

class PTV {
  constructor(dev_id, key) {
    this.dev_id = dev_id;
    this.key = key;
  }
}

app.get("/", function(req, res) {

})

app.listen(3000, function(req, res) {
  console.log("App started");
});
