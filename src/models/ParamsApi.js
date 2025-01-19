const mongoose = require("mongoose");
const ParamsApi = mongoose.Schema(
    {
        apiId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ApiHorsecoped",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        Validate: {
            type: String,
            required: true,
        },
        Desc: {
            type: String,
        },
        Value: {
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

module.exports = mongoose.model("ParamsApi", ParamsApi);
