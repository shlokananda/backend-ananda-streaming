const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { composeWithMongoose } = require("graphql-compose-mongoose");
const { ObjectId } = require("mongoose");
const MediaSchema = new Schema(
  // {
  //   title: String,
  //   duration: String,
  //   artist: ObjectId | String,
  //   album: ObjectId | String,
  //   genre: ObjectId | String,
  //   isActive: Boolean,
  // },
  // { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
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
  } */,
  }
);

module.exports = {
  MediaSchema: mongoose.model("tracks", MediaSchema),
  MediaTC: composeWithMongoose(mongoose.model("tracks", MediaSchema)),
};
