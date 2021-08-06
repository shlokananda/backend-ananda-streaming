const mediaModel = require("../model/media");

module.exports.addTrack = async (musicObject) => {
  const media = new mediaModel.MediaSchema(musicObject);
  try {
    await media.save();
    console.log(media);
    return media;
  } catch (error) {}
};
