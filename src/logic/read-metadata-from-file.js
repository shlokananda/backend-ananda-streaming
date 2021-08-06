const mm = require("music-metadata");

module.exports.readMetaData = async (buffer, mimetype, fileInfo) => {
  try {
    const metadata = await mm.parseBuffer(buffer, mimetype);
    const commonData = metadata.common;
    const musicObject = {
      title: commonData.title,
      artists: commonData.artists,
      artist: commonData.artist,
      album: commonData.album,
      year: commonData.year,
      composer: commonData.composer,
      genre: commonData.genre,
      // picture: commonData.picture,
      track: commonData.track, // Object
      format: metadata.format,
      file: fileInfo, // Object (S3 Path)
    };
    console.log(musicObject);
    return musicObject;

    // res.send(musicObject);
  } catch (error) {
    console.error(error.message);
    // res.send(error.message);
  }
};
