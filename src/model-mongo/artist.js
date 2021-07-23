const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = require("mongoose");
const ArtistSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, lowercase: true },
    isActive: Boolean,
  }
  // { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("artists", ArtistSchema);
