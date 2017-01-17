const aws = require('aws-sdk'),
      multer = require('multer'),
      multerS3 = require('multer-s3');

const s3 = new aws.S3({
  accessKeyId: process.env.S3KEY,
  secretAccessKey: process.env.S3SECRET,
  region: process.env.S3REGION,
});

upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3BUCKET,
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname);
            //use Date.now() for unique file keys
        }
    })
}).single('audiofile');

exports.uploadAudio = (req, res) => {
  upload(req, res, function(err) {
    if (err) {
      console.error(err);
      return;
    } else {
      res.json(req.file);
    }
  })
};
