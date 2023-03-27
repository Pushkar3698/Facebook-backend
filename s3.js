require("dotenv").config();
const { S3 } = require("aws-sdk");
const fs = require("fs");
const multer = require("multer");
const multerS3 = require("multer-s3");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId: accessKeyId,
  secretAccessKey: secretKey,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});

// uploads a file

const uploadFile = (file) => {
  const uploadParams = {
    Bucket: bucketName,
    Body: file.buffer,
    Key: file.originalname,
  };

  return s3.upload(uploadParams).promise();
};

// downloads a file

const getFileStream = (fileKey) => {
  const downloadParams = {
    key: fileKey,
    Bucket: bucketName,
  };

  return s3.getObject(downloadParams).createReadStream();
};

module.exports = { uploadFile, getFileStream, upload };
