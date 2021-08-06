// Module Imports
const AWS = require("aws-sdk");
const fs = require("fs");
const { AWS_CREDENTIALS } = require("../../credentials");
// Constant Declarations
const KEY_ID = process.env.AWS_ACCESS_KEY || AWS_CREDENTIALS.AWS_ACCESS_KEY;
const SECRET_KEY =
  process.env.AWS_SECRET_ACCESS_KEY || AWS_CREDENTIALS.AWS_SECRET_ACCESS_KEY;
const BUCKET_NAME = process.env.BUCKET_NAME || AWS_CREDENTIALS.BUCKET_NAME;

module.exports.uploadFile = async (file, name) => {
  // Perform Operation
  try {
    console.log(file, name);
    //   Login to AWS Account
    const s3 = new AWS.S3({
      accessKeyId: KEY_ID,
      secretAccessKey: SECRET_KEY,
    });

    /*
    Upload File Logic
    */

    // Read File Contents
    const fileContent = fs.readFileSync(file);

    // Set Parameter/ Configuration for file
    const params = {
      Bucket: BUCKET_NAME,
      Key: name || "Tests.mp3", // File Name that we want to store
      Body: fileContent,
      ContentType: "audio/mpeg",
      ACL: "public-read", //Can be accessed just by url
    };

    // Upload file to S3 Specified Bucket
    s3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        return err;
      } else {
        console.log("File Uploaded Successfully! ", data.Location);
        return data;
      }
    });
    /*
    File Upload Logic Ends Here
    */
  } catch (err) {
    // Handle Error
    console.log(err);
    return err;
  }
};
