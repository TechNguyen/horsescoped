const express = require("express");
const router = express.Router();
const {
    getPageListApiHorsecoped,
    getOneApiHorsecoped,
    createApiHorsecoped,
    updateApiHorsecoped,
    deleteApiHorsecoped,
} = require("../controllers/ApiHorsecopedController");

router.get("/page-list", getPageListApiHorsecoped);
router.get("/:id", getOneApiHorsecoped);
router.post("/", createApiHorsecoped);
router.put("/:id", updateApiHorsecoped);
router.delete("/:id", deleteApiHorsecoped);

module.exports = router;
