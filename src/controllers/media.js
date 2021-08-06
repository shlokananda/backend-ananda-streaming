const util = require("util");
const https = require("https");
const fs = require("fs");

const mediaModel = require("../model/media");
const { readMetaData } = require("../logic/read-metadata-from-file");
const { addTrack } = require("../db-operations/tracks");
const { uploadFile } = require("../logic/s3-upload");

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

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

// Upload to S3
exports.media_cloud_upload = function (req, res) {
  try {
    console.log("media_cloud_upload");
    const file = `${__dirname}/samples/01OmKali.mp3`;
    const name = "New Kali.mp3";
    uploadFile(file, name).then((uploadedFile) => {
      console.log(uploadedFile);
      res.send(uploadedFile);
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

// Display media delete form on GET.
exports.media_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Media delete GET");
};
