const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

const credentials = require('./dbConfig.json');

const s3 = new S3Client({ 
  region: "us-east-1",
  credentials: credentials.aws
});

const bucketName = 'video.library';

const getVideo = async (keyName) => {
  try {
    const data = await s3.send(new GetObjectCommand({ Bucket: bucketName, Key: keyName }));
    console.log("Success");
    return data.Body;
  } catch (err) {
    console.log("Error", err);
    return;
  }
};

const getVideoNames = async () => {
  try {
    const data = await s3.send(new ListObjectsCommand({ Bucket: bucketName }));
    console.log("Success");
    return data;
  } catch (err) {
    console.log("Error", err);
    return;
  }
}

const uploadVideo = async (keyName, body) => {
  try {
    const data = await s3.send(new PutObjectCommand({ Bucket: bucketName, Key: keyName, Body: body }));
    console.log("Success");
    return data;
  } catch (err) {
    console.log("Error", err);
    return;
  }
}

module.exports = { 
  getVideo,
  getVideoNames,
  uploadVideo,
};