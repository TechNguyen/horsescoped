const mongoose = require("mongoose");
const AppUser = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please add a name"],
        },
        email: {
            type: String,
            required: [true, "Please add an email"],
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please add a valid email",
            ],
        },
        phone: {
            type: String,
            required: [true, "Please add a phone"],
            unique: true,
            match: [/^[0-9]{10}$/, "Please add a valid phone number"],
        },
        passwordHash: {
            type: String,
            required: [true, "Please add a password"],
        },
        countFailedLogin: {
            type: Number,
            default: 0,
        },
        isLockedOut: {
            type: Boolean,
            default: false,
        },
        isConfirmedEmail: {
            type: Boolean,
            default: false,
        },
        isConfirmedPhone: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model("AppUser", AppUser);
