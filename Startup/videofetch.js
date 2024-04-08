const { S3Client, GetObjectCommand, ListObjectsCommand, PutObjectCommand } = require("@aws-sdk/client-s3");

const credentials = require('./dbConfig.json');
const { Readable } = require('stream');
const { Upload } = require("@aws-sdk/lib-storage");
const fs = require('fs');


const s3 = new S3Client({ 
  region: "us-east-1",
  credentials: credentials.aws
});

const bucketName = 'video.library';



const getVideo = async (keyName) => {
  try {
    const data = await s3.send(new GetObjectCommand({ Bucket: bucketName, Key: keyName + ".mp4"}));
    if (data) {
      console.log("Success");
      return data.Body;
    }
  } catch (err) {
    console.log("Error", err);
    throw err;
  }
};

const getThm = async (keyName) => {
  try {
    const data = await s3.send(new GetObjectCommand({ Bucket: bucketName, Key: keyName + ".jpg"}));
    if (data) {
      console.log("Success");
      return data.Body;
}
  } catch (err) {
    console.log("Error", err);
    return;
  }
};

const getDesc = async (keyName) => {
  try {
    const data = await s3.send(new GetObjectCommand({ Bucket: bucketName, Key: keyName + ".txt"}));
    if (data) {
      console.log("Success");
      return data.Body;
}
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

const uploadVideo = async (keyName, description, thm, video) => {
  try {
    // Upload thumbnail
    const thmStream = fs.createReadStream(thm.path);

    const thmUploader = new Upload({
      client: s3,
      params: {
        Bucket: bucketName,
        Key: keyName + ".jpg",
        Body: thmStream
      }
    });

    const thmData = await thmUploader.done();
    console.log("Thumbnail upload completed:", thmData);

    // Upload video
    const videoStream = fs.createReadStream(video.path);

    const videoUploader = new Upload({
      client: s3,
      params: {
        Bucket: bucketName,
        Key: keyName + ".mp4",
        Body: videoStream
      }
    });

    const videoData = await videoUploader.done();
    console.log("Video upload completed:", videoData);

    // Upload description
    const descStream = new Readable();
    descStream.push(description);
    descStream.push(null);

    const descUploader = new Upload({
      client: s3,
      params: {
        Bucket: bucketName,
        Key: keyName + ".txt",
        Body: descStream
      }
    });

    const descData = await descUploader.done();
    console.log("Description upload completed:", descData);

    return true;
  } catch (err) {
    console.log("Error: ", err);
    return false;
  }
}

module.exports = { 
  getVideo,
  getVideoNames,
  uploadVideo,
  getThm,
  getDesc
};