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





//
// app.get("/url2", (req, res, next) => {
//   res.json(["Tony", "Lisa", "Michael", "Ginger", "Food"]);
// });

// app.get("/upload", (req, res, next) => {

//   var account = "59da0cdbb576ae7a2ba696b38e68317e";
//   var zone = "49c56b237c721c9b6e32c49fc4e049d9";
//   var email = "ahmad.alhourani.ite90@gmail.com";
//   var apiKey = "6bb216873ca0923bf06d8f3e826ffbe9d349c";
//   var path = __dirname + "/test.mp4";
//   const uploader = new CloudflareStream({
//     email: email, // cloudflare email address
//     key: apiKey // cloudflare api key
//   });

//   const upload = uploader.upload({
//     zone: zone, // cloudflare zone id
//     path: path // path to video on filesystem
//   });

//   upload.on('progress', (progress) => {
//     console.log(`${progress.precentage} of upload completed (${progress.uploaded} bytes / ${progress.total} bytes)`);
//   });

//   upload.on('error', (error) => {
//     console.log('An error has occurred', error);
//   });

//   upload.on('success', (response) => {
//     console.log(response);
//   });
//   res.json(["Tony", "Lisa", "Michael", "Ginger", "Food"]);
// });

// app.get("/url", (req, res, next) => {
//   // specify location of file you'd like to upload below
//   var path = __dirname + "/test.mp4";
//   var file = fs.createReadStream(path);
//   var size = fs.statSync(path).size;

//   var account = "59da0cdbb576ae7a2ba696b38e68317e";
//   var zone = "49c56b237c721c9b6e32c49fc4e049d9";
//   var email = "ahmad.alhourani.ite90@gmail.com";

//   var apiKey = "6bb216873ca0923bf06d8f3e826ffbe9d349c";

//   var options = {
//     endpoint: "https://api.cloudflare.com/client/v4/accounts/" + account + "/stream",
//     headers: {
//       'X-Auth-Email': email,
//       'X-Auth-Key': apiKey,
//     },
//     chunkSize: 5 * 1024 * 1024, // Cloudflare Stream requires a minimum chunk size of 5MB.
//     resume: true,
//     metadata: {
//       filename: "test.mp4",
//       filetype: "video/mp4"
//     },
//     uploadSize: size,
//     onError: function (error) {
//       throw error;
//     },
//     onProgress: function (bytesUploaded, bytesTotal) {
//       var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2);
//       console.log(bytesUploaded, bytesTotal, percentage + "%");
//     },
//     onSuccess: function () {
//       console.log("Upload finished:", upload.url);
//       var index = upload.url.lastIndexOf("/") + 1;
//       var mediaId = upload.url.substr(index)
//       console.log("Media id:", mediaId);
//       res.json(mediaId);
//     }
//   };

//   var upload = new tus.Upload(file, options);
//   upload.start();


//   res.json(["Tony", "Lisa", "Michael", "Ginger", "Food"]);
// });


