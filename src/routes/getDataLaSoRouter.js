const express = require("express");
const router = express.Router();
const { authorize } = require("../middleware/authMiddleware");
const { GetPageListDataLaSo } = require("../controllers/getDataLaSoController");

// Public routes
router.get("/page-list", GetPageListDataLaSo);
module.exports = router;
