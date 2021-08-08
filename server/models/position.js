const mongoose = require("mongoose");

const positionSchema = new mongoose.Schema(
    {
        positions:{
            type:String,
            required:true,
            enum:[
                'Goalkeeper',
                'Sweeper',
                'Right Back',
                'Left Back',
                'Left Centre Back',
                'Right Centre Back',
                'Centre Back',
                'Right Wing Back',
                'Left Wing Back',
                'Left Defensive Midfield',
                'Right Defensive Midfield',
                'Centre Defensive Midfield',
                'Left Midfield',
                'Right Midfield',
                'Centre Midfield',
                'Left Centre Midfield',
                'Right Centre Midfield',
                'Left Attacking Midfield',
                'Right Attacking Midfield',
                'Centre Attacking Midfield',
                'Left Winger',
                'Right Winger',
                'Centre Forward',
                'Left Striker',
                'Right Striker',
                'Striker'
            ],
            default:[
                'Goalkeeper',
                'Sweeper',
                'Right Back',
                'Left Back',
                'Left Centre Back',
                'Right Centre Back',
                'Centre Back',
                'Right Wing Back',
                'Left Wing Back',
                'Left Defensive Midfield',
                'Right Defensive Midfield',
                'Centre Defensive Midfield',
                'Left Midfield',
                'Right Midfield',
                'Centre Midfield',
                'Left Centre Midfield',
                'Right Centre Midfield',
                'Left Attacking Midfield',
                'Right Attacking Midfield',
                'Centre Attacking Midfield',
                'Left Winger',
                'Right Winger',
                'Centre Forward',
                'Left Striker',
                'Right Striker',
                'Striker'
            ],
        }
    }
);

module.exports = mongoose.model("Position", positionSchema);
