const express = require("express");
const router = express.Router();
const { uploads } = require("../middleware/uploadHandler");
const { UploadFile } = require("../controllers/TaiLieuDinhKemController");
const { authorize } = require("../middleware/authMiddleware");

router.post(
    "/upload",
    authorize(["ADMIN"]),
    uploads.single("upload"),
    async (req, res) => {
        try {
            if (!req.file) {
                return res
                    .status(400)
                    .json(
                        new ApiResponse(400, "File is required", null, false),
                    );
            } else {
                await UploadFile(req, res);
            }
        } catch (err) {
            return res
                .status(500)
                .json(
                    new ApiResponse(500, "Internal server error", err, false),
                );
        }
    },
);

module.exports = router;
