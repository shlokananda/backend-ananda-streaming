const util = require("util");
const https = require("https");
// const mp3Url =
//   "https://streaming-platform-test.s3.us-east-2.amazonaws.com/01OmKali.mp3";
const fs = require("fs");
const AWS = require("aws-sdk"); // AWS
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const mediaModel = require("../model/media");
const { readMetaData } = require("../logic/read-metadata-from-file");
const { addTrack } = require("../db-operations/tracks");

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

const uploadFile = (key) => {
  const fileName = `${__dirname}/01OmKali.mp3`;
  fs.readFile(fileName, (err, data) => {
    if (err) throw err;
    const params = {
      Bucket: "streaming-platform-test", // pass your bucket name
      Key: key, // file will be saved as testBucket/contacts.csv
      Body: JSON.stringify(data, null, 2),
    };
    s3.upload(params, function (s3Err, data) {
      if (s3Err) throw s3Err;
      console.log(`File uploaded successfully at ${data.Location}`);
      return `File uploaded successfully at ${data.Location}`;
    });
  });
};

exports.index = function (req, res) {
  res.send("Media API Ready");
};

// Display list of all medias.
exports.media_list = async function (req, res) {
  const medias = await mediaModel.MediaSchema.find({});
  console.log(medias);
  try {
    res.send(medias);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Display detail page for a specific media.
exports.media_detail = function (req, res) {
  res.send("NOT IMPLEMENTED: Media detail: " + req.params.id);
};

// Display media create form on GET.
exports.media_create_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Media create GET");
};

// Handle media create on POST.
exports.media_create_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Media create POST");
};

// Handle media upload on POST.
exports.media_upload_post = function (req, res, next) {
  //OLD:  res.send(uploadFile(`${__dirname}/01OmKali.mp3`));
  try {
    // console.log(req);
    const file = req.file;
    let musicObject; // Store Extracted IDV32 Details
    console.log(file);
    // Step #1: Read & Store File Buffer (Local)
    const newpath = `${__dirname}/samples/${file.originalname}`;
    if (fs.existsSync(newpath)) {
      // path exists
      console.log("File Exist: ", newpath);
    } else {
      writeFile(newpath, file.buffer).then(() => {
        // Step #2: Read Buffer to Read IDV32 tags
        readMetaData(newpath).then((meta) => {
          // console.log(meta);
          // Step #3: Insert into Database
          addTrack(meta).then((addedTrackInfo) => {
            try {
              res.send(addedTrackInfo);
            } catch (error) {
              res.status(500).send("Error Storing File Info");
            }
          });
        });
      });
    }
  } catch (err) {
    next(err);
  } finally {
    // res.send(req.file);
  }
};

// Display media delete form on GET.
exports.media_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Media delete GET");
};
