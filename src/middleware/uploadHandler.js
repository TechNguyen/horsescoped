const multer = require("multer");
const path = require("path");
const fs = require("fs");
const ApiResponse = require("../utils/apiResponse");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const filePath = path.join(__dirname, "../uploads/blogs");

        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath, { recursive: true });
        }
        cb(null, filePath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    },
});

const filters = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(
            new Error(
                "Invalid file type! Only JPEG, PNG, and PDF are allowed.",
            ),
            false,
        );
    }
};

const uploads = multer({
    storage: storage,
    fileFilter: filters,
    limits: { fieldSize: 10 * 1024 * 1024 },
});

module.exports = {
    uploads,
};
