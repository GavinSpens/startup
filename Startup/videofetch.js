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
    // delete last 4 characters of each key to remove file extension
    data.Contents.forEach((element) => {
      element.Key = element.Key.slice(0, -4);
    });
    // put the keys in an exclusive set (not allowing repeats) and return it
    return [...new Set(data.Contents.map((element) => element.Key))];
  } catch (err) {
    console.log("Error", err);
    return;
  }
}

const likeVideo = async (keyName) => {
  try {
    const data = await s3.send(new GetObjectCommand({ Bucket: bucketName, Key: keyName + ".txt"}));
    const txt = data.Body.toString();
    const [desc, likes] = txt.split("\n");
    const sent = await s3.send(new PutObjectCommand({ Bucket: bucketName, Key: keyName + ".txt", Body: desc + "\n" + (parseInt(likes) + 1) }));
    return true;
  } catch (err) {
    console.log("Error", err);
    return false;
  }
}

const uploadVideo = async (keyName, description, thm, video) => {
  try {
    // Upload thumbnail
    const thmStream = Readable.from(thm.buffer);

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
    const videoStream = Readable.from(video.buffer);

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
  getDesc,
  likeVideo
};