const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
  {
    text: {
      type: String,
    },
    creatorId: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    likes: [{ type: ObjectId, ref: "User" }],
    comments: [
      {
        comment: { type: String },
        userId: { type: ObjectId, ref: "User" },
        postId: { type: ObjectId, ref: "Post" },
      },
    ],
    imagePath: {
      type: String,
    },
    imageFileName: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
