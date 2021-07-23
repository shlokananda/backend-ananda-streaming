const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = require("mongoose");
const MediaSchema = new Schema(
  // {
  //   title: { type: String, required: true, trim: true, lowercase: true },
  //   // duration: String,
  //   // artist: ObjectId | String,
  //   // album: ObjectId | String,
  //   // genre: ObjectId | String,
  //   // isActive: Boolean,
  // }
  {
    title: String,
    artists: [], //String [ 'Swami Kriyananda' ]
    artist: String, //'Swami Kriyananda',
    album: String, //"I've Passed My Life as a Stranger, Lord",
    year: Number, //2005,
    composer: [], //String["Swami Kriyananda"],
    genre: [], //String["Singing"],
    track: Object, //{ no: 5, of: 23 },
    format: Object /* {
      tagTypes: ["ID3v2.2"],
      trackInfo: [],
      lossless: false,
      container: "MPEG",
      codec: "MPEG 1 Layer 3",
      sampleRate: 44100,
      numberOfChannels: 2,
      bitrate: 192000,
      codecProfile: "CBR",
      numberOfSamples: 11902464,
      duration: 269.89714285714285,
    }, */,
  }
  // { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("media", MediaSchema);
// module.exports = mongoose.model("tracks", MediaSchema);
