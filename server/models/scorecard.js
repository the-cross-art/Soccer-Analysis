const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const scorecardSchema = new mongoose.Schema(
    {
        player: {
            type: ObjectId,
            ref: "Player",
            required: true,
        },
        matchs: [{
            match: {
                type: ObjectId,
                ref: "Match",
            },
            date:{
                type:Date
            },
            goals:{
                type:Number,
                default:0
            },
            position:{
                type:String
            },
            team: {
                type: ObjectId,
                ref: "Team",
                required: true,
            },
        }],
        no_of_matches: {
            type: Number,
            required: true,
            default: 0
        },
        total_goals: {
            type: Number,
            required: true,
            default: 0
        },
        avg_goals: {
            type: Number,
            required: true,
            default: 0
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Scorecard", scorecardSchema);
