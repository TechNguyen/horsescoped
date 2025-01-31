const express = require("express");
const router = express.Router();
const { CreateBlog } = require("../controllers/BlogController");

router.post("/create", CreateBlog);

module.exports = router;
