const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const playerSchema = new mongoose.Schema(
    {
        user: {
            type: ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            trim: true,
            required: "Name is required",
            minlength: [2, "Too short"],
            maxlength: [20, "Too long"],
        },
        image: {
            type: String,
            trim: true,
            required: true
        },
        age: {
            type: Number,
            required: true,
            min: 18
        },
        gender: {
            type: String,
            enum: ['m', 'f', 'o'],
            required: true
        },
        height: {
            type: Number,
            required: true,
            min: 5
        },
        weight: {
            type: Number,
            required: true,
            min: 50
        },
        leagues_teams: [{
            league: {
                l_id:{
                    type: ObjectId,
                    ref: "League",
                },
                l_name:{
                    type:String
                }
            },
            team:{
                t_id:{
                    type: ObjectId,
                    ref: "Team",
                },
                t_name:{
                    type:String
                }
            } 
        }],
        scoreboard: [{
            scorecard:{
                type: ObjectId,
                ref: "Scorecard",
            },
            league: {
                type: ObjectId,
                ref: "League",
                required: true,
            },
        }]
    },
    { timestamps: true }
);

playerSchema.index({ user: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("Player", playerSchema);
