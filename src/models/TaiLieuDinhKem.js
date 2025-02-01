const mongoose = require("mongoose");

const TaiLieuDinhKem = mongoose.Schema(
    {
        FileExtension: {
            type: String,
        },
        FilePath: {
            type: String,
            require: true,
        },
        FileSize: {
            type: Number,
        },
        FileType: {
            type: String,
            require: true,
        },
        FileName: {
            type: String,
            require: true,
        },
        TYPEAttach: {
            type: String,
            require: true,
        },
        createId: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
        },
        createBy: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true,
    },
);
module.exports = mongoose.model("TaiLieuDinhKem", TaiLieuDinhKem);
