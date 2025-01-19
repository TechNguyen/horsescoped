const express = require("express");
const router = express.Router();
const {
    getPageListApiHorsecoped,
    getOneApiHorsecoped,
    createApiHorsecoped,
    updateApiHorsecoped,
    deleteApiHorsecoped,
    requestApiToCrawel,
} = require("../controllers/ApiHorsecopedController");

router.get("/page-list", getPageListApiHorsecoped);
router.get("/get-one", getOneApiHorsecoped);
router.post("/create", createApiHorsecoped);
router.put("/update", updateApiHorsecoped);
router.delete("/delete", deleteApiHorsecoped);
router.post("/request-api-to-crawel", requestApiToCrawel);
module.exports = router;
