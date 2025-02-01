const mongoose = require("mongoose");

const Blog = new mongoose.Schema({
    title: {
        type: String,
    },
    slug: {
        type: String,
    },
    description: {
        type: String,
    },
    meta: {
        type: String,
    },
    keyword: {
        type: String,
    },
    content: {
        type: String,
    },
    status: {
        type: String,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    updateAt: {
        type: Date,
        default: Date.now,
    },
    isShow: {
        type: Boolean,
        default: true,
    },
    isDelete: {
        type: Boolean,
        default: false,
    },
    ThumnailsId: {
        type: mongoose.Schema.ObjectId,
        ref: "TaiLieuDinhKem",
    },
});
module.exports = mongoose.model("Blog", Blog);
