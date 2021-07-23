const mediaModel = require("../model/media");

module.exports.addTrack = async (musicObject) => {
  const media = new mediaModel.MediaSchema(musicObject);
  try {
    await media.save();
    console.log(media);
    return media;
    // res.send(media);
  } catch (error) {
    // res.status(500).send(error);
  }
};
