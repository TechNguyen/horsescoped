const express = require("express");
const router = express.Router();
const { authorize } = require("../middleware/authMiddleware");
const {
    createByApiId,
    getByApiId,
    getPageListParamsApi,
    deleteParamsApi,
    update,
} = require("../controllers/ParamsApiController");

router.post("/create-by-api-id", createByApiId);
router.get("/get-by-api-id", getByApiId);
router.get("/page-list", getPageListParamsApi);
router.delete("/delete", deleteParamsApi);
router.put("/update", update);

module.exports = router;
