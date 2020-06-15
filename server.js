const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");
const apiStream = require("./app/api/stream");

var cors = require('cors')
const app = express();
app.use(cors())
app.use(bodyParser.json());
db.sequelize.sync();

apiStream(app, db)

var server = app.listen(4000, "localhost", function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Server app listening at http://%s:%s", host, port)

});





