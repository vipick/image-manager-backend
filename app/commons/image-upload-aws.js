const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const uuid = require("uuid");

const region = "ap-northeast-2";
const accessKey = process.env.PROD_AWS_S3_ACCESS_KEY;
const secretKey = process.env.PROD_AWS_S3_SECRET_KEY;
const imageBucket = process.env.PROD_AWS_IMAGE_BUCKET;
const fileType = "image/jpg";
const fileName = uuid.v4();
const fileSize = 10 * 1024 * 1024;

AWS.config.update({
  accessKeyId: accessKey,
  secretAccessKey: secretKey,
  region: region,
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: imageBucket,
    contentType: function (req, file, cb) {
      cb(null, fileType);
    },
    key(req, file, cb) {
      cb(null, `${fileName}`);
    },
  }),
  limits: { fileSize: fileSize },
});

module.exports = upload;
