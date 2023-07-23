const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const uuid = require("uuid");

const endpoint = new AWS.Endpoint("https://kr.object.ncloudstorage.com");
const region = "kr-standard";
const accessKey = process.env.PROD_NCP_ACCESS_KEY;
const secretKey = process.env.PROD_NCP_SECRET_KEY;
const imageBucket = process.env.PROD_NCP_IMAGE_BUCKET;

const S3 = new AWS.S3({
  endpoint,
  region,
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
  },
});

const upload = multer({
  storage: multerS3({
    s3: S3,
    bucket: imageBucket,
    acl: "public-read",
    contentType: function (req, file, cb) {
      cb(null, "image/jpg");
    },
    key(req, file, cb) {
      try {
        cb(null, `${uuid.v4()}`);
      } catch (error) {
        console.log(error);
      }
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
});

module.exports = upload;
