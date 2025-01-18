const mongoose = require("mongoose");

const AppUserRole = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AppUser",
        },
        roleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AppRole",
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
module.exports = mongoose.model("AppUserRole", AppUserRole);
