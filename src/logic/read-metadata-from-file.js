const mm = require("music-metadata");

module.exports.readMetaData = async (newpath) => {
  try {
    const metadata = await mm.parseFile(newpath);
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
    };
    console.log(musicObject);
    return musicObject;

    // res.send(musicObject);
  } catch (error) {
    console.error(error.message);
    // res.send(error.message);
  }
};
