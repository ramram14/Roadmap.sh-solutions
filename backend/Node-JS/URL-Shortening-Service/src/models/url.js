const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    shortCode: {
        type: String,
        required: true,
        unique: true,
    },
    accessCount: {
        type: Number,
        default: 0,

        // only select when needed
        select: false
    }
}, {
    timestamps: true,
});

const Url = mongoose.models.url || mongoose.model("url", urlSchema);
module.exports = Url;