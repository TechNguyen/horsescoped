const express = require("express");
const router = express.Router();
const {
    getDataUserController,
    getDataLaSoController,
} = require("../controllers/DashboardController");
const { authorize } = require("../middleware/authMiddleware");
router.get("/getDataUserController", getDataUserController);
router.get("/getDataLaSoController", getDataLaSoController);
module.exports = router;
