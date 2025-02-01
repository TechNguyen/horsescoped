const express = require("express");
const router = express.Router();
const { CreateBlog, getBlog } = require("../controllers/BlogController");

router.post("/create", CreateBlog);
router.get("/getPageList", getBlog);

module.exports = router;
