const asyncHandler = require("express-async-handler");
const ApiResponse = require("../utils/apiResponse");
const path = require("path");

const { createOne, createMany } = require("../core/controllers/baseController");
const TaiLieuDinhKem = require("../models/TaiLieuDinhKem");
const FileConstant = require("../constant/FileConstant");
const { log } = require("console");

const UploadFile = asyncHandler(async (req, res) => {
    try {
        // Xem xét các cookie trong yêu cầu
        const attachment = req.file;
        const { mimetype, filename, size, originalname } = attachment;
        const attachmentDk = {
            FileExtension: originalname.substring(
                originalname.lastIndexOf("."),
            ),
            FileName: filename,
            FilePath: path.join("/uploads/blogs", filename),
            FileSize: size,
            FileType: mimetype,
            createId: req.user._id,
            TYPEAttach: FileConstant.BLOG,
            createBy: req.user.username,
        };
        const resApi = await createOne(TaiLieuDinhKem, attachmentDk);
        if (resApi.getStatus()) {
            return res.status(200).json({
                uploaded: 1,
                fileName: filename,
                width: 300,
                height: 200,
                id: resApi.data._id,
                url: `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}/uploads/blogs/${attachmentDk.FileName}`,
            });
        } else {
            return resApi.createResError(res);
        }
    } catch (err) {
        return res
            .status(500)
            .json(new ApiResponse(500, "Internal server error", err, false));
    }
});

module.exports = {
    UploadFile,
};
