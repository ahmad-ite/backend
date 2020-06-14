module.exports = (app, db) => {

  var multer = require('multer')
  var upload = multer({ dest: 'uploads/' })

  app.post("/upload_video", upload.single('file'), (req, res) => {


    console.log("ree", req.file);
    if (!req.file) {
      return res.json(false)
    }
    var fs = require("fs");
    var tus = require("tus-js-client");
    var path = req.file.path;
    var file = fs.createReadStream(path);
    var size = fs.statSync(path).size;
    var cloudflare = require(__dirname + '/../../config/env.json')["cloudflare"];

    var account = cloudflare.account;
    var email = cloudflare.email;
    var apiKey = cloudflare.apiKey;

    var options = {
      endpoint: "https://api.cloudflare.com/client/v4/accounts/" + account + "/stream",
      headers: {
        'X-Auth-Email': email,
        'X-Auth-Key': apiKey,
      },
      chunkSize: 5 * 1024 * 1024, // Cloudflare Stream requires a minimum chunk size of 5MB.
      resume: true,
      metadata: {
        filename: req.file.originalname,
        filetype: "video/mp4"
      },
      uploadSize: size,
      onError: function (error) {
        throw error;
      },
      onProgress: function (bytesUploaded, bytesTotal) {
        var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2);
        console.log(bytesUploaded, bytesTotal, percentage + "%");
      },
      onSuccess: function () {
        console.log("Upload finished:", upload.url);
        var index = upload.url.lastIndexOf("/") + 1;
        var mediaId = upload.url.substr(index)
        console.log("Media id:", mediaId);

        db.media.create({
          name: req.file.originalname,
          uuid: mediaId,
          type: req.file.mimetype,

        }).then((result) => res.json(mediaId))
      }
    };

    var upload = new tus.Upload(file, options);
    upload.start();

  }
  ),

    app.get("/media", (req, res) =>
      db.media.findAll(
        {
        }

      ).then((result) => res.json(result))
    );

}