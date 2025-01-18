const mongoose = require("mongoose");
const AppRole = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        roleCode: {
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
module.exports = mongoose.model("AppRole", AppRole);
