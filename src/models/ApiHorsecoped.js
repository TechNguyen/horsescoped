const mongoose = require("mongoose");
const ApiHorsecoped = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        method: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model("ApiHorsecoped", ApiHorsecoped);
