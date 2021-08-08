const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const leagueSchema = new mongoose.Schema(
    {
        user: {
            type: ObjectId,
            ref: "User",
            required: true,
        },
        league_name: {
            type: String,
            trim: true,
            required: "League name is required",
            minlength: [2, "Too short"],
            maxlength: [32, "Too long"],
        },
        image: {
            type: String,
            trim: true,
            required: "Image is required",
        }
    },
    { timestamps: true }
);

leagueSchema.index({ user: 1, league_name: 1}, { unique: true });

module.exports = mongoose.model("League", leagueSchema);
