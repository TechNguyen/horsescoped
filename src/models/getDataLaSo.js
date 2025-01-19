const mongoose = require("mongoose");
const getDataLaSo = mongoose.Schema(
    {
        url: {
            type: String,
            required: true,
        },
        method: {
            type: String,
            required: true,
        },
        ipRequest: {
            type: String,
            required: true,
        },
        requestBody: {
            type: String,
            required: true,
        },
        data: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model("getDataLaSo", getDataLaSo);
