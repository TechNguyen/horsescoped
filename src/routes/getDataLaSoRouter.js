const express = require("express");
const router = express.Router();
const { authorize } = require("../middleware/authMiddleware");
const { GetPageList } = require("../controllers/DetailCrawler");

// Public routes
router.get("/page-list", GetPageList);
module.exports = router;
