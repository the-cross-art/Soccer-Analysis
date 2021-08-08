const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const matchSchema = new mongoose.Schema(
    {
        league:{
            type:ObjectId,
            ref:"League"
        },
        team:{
            type:ObjectId,
            ref:"Team"
        },
        players:[{
            type:ObjectId,
            ref:"Player"
        }]
    },
    { timestamps: true }
);

module.exports = mongoose.model("Match", matchSchema);


// name: {
//     type: String,
//     required: true,
//     maxlength: 32,
//     minlength: 3,
// },
// date: {
//     type: Date,
//     required: true,
//     default: new Date()
// },
// team: {
//     name: {
//         type: String,
//         required: true,
//         maxlength: 32,
//         minlength: 3,
//     },
//     players: [{
//         name: {
//             type: String,
//             required: true,
//             minlength: 3,
//             maxlength: 32
//         },
//         phone: {
//             type: Number,
//             required: true,
//             minlength: 10,
//             maxlength: 10
//         },
//         age: {
//             type: Number,
//             required: true,
//             min: 10,
//             max: 50
//         }
//     }]
// }
