const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
// defining the schema
const userModel = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    bDay: {
      type: String,
      required: true,
    },
    bMonth: {
      type: String,
      required: true,
    },
    bYear: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    friends: [{ type: ObjectId, ref: "User" }],
    password: {
      type: String,
      required: true,
    },
    gender: { type: String, required: true },
    picture: {
      type: String,
      trim: true,
      default:
        "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png",
    },
  },
  {
    timestamps: true,
  }
);

// exporting the bookings module
module.exports = mongoose.model("User", userModel);
