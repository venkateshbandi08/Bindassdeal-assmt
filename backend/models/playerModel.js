const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  team: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default:
      "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
  },
});

module.exports = mongoose.model("players", playerSchema);
