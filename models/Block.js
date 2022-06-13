const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({
    locationTag: {
        type: String,
    },
    sensors: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Sensor",
            default: []
        }
    ],
    actuators: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Actuator",
            default: []
        }
    ]
});

module.exports = mongoose.model('Block', blockSchema);

// Block {
//     location_Number,
//     Sensor[],
//     Actuators[],
// }

