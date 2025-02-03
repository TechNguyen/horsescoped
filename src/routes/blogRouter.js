const express = require("express");
const router = express.Router();
const {
    CreateBlog,
    getBlog,
    GetBlogBySlug,
} = require("../controllers/BlogController");

router.post("/create", CreateBlog);
router.get("/getPageList", getBlog);
router.get("/getBySlug", GetBlogBySlug);

module.exports = router;
