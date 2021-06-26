const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { composeWithMongoose } = require("graphql-compose-mongoose");
const { ObjectId } = require("mongoose");
const MediaSchema = new Schema(
  {
    title: String,
    duration: String,
    artist: ObjectId | String,
    album: ObjectId | String,
    genre: ObjectId | String,
    isActive: Boolean,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = {
  MediaSchema: mongoose.model("media", MediaSchema),
  MediaTC: composeWithMongoose(mongoose.model("media", MediaSchema)),
};
