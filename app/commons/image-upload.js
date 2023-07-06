const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
var uuid = require("uuid");

const IMAGE_BUCKET =
  process.env.NODE_ENV === "production"
    ? process.env.S3_PROD_IMAGE_BUCKET
    : process.env.S3_DEV_IMAGE_BUCKET;

AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

let upload;
try {
  upload = multer({
    storage: multerS3({
      s3: new AWS.S3(),
      bucket: IMAGE_BUCKET,
      contentType: function (req, file, cb) {
        cb(null, "image/jpg");
      },
      key(req, file, cb) {
        cb(null, `${uuid.v4()}`);
      },
    }),
    limits: { fileSize: 10 * 1024 * 1024 },
  });
} catch (err) {
  console.log(err);
}

module.exports = upload;
