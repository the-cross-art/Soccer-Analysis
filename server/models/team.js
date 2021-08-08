const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const teamSchema = new mongoose.Schema(
  {
    team_name: {
      type: String,
      trim: true,
      required: "Name is required",
      minlength: [2, "Too short"],
      maxlength: [32, "too long"],
    },
    league: {
      type: ObjectId,
      ref: "League",
      required: true,
    },
    image: {
      type: String,
      trim: true,
      required: "Image is required",
    },
    players: [{
      type: ObjectId,
      ref: 'Player'
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Team", teamSchema);
