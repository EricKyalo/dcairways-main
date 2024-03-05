const mongoose = require('mongoose');

const anchorSchema = new mongoose.Schema(
    {
        images: [{
            url: String,
            filename: String
        }],
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
)

module.exports = mongoose.model("anchorImages", anchorSchema);