const asyncHandler = require("express-async-handler");

const {
    getPageList,
    createOne,
} = require("../core/controllers/baseController");
const DetailCrawerl = require("../models/DetailCrawerl");
const ApiResponse = require("../utils/apiResponse");
const CreateDetail = asyncHandler(async (req, res) => {
    try {
        const result = await getPageList(DetailCrawerl, req.params);
        if (result.getStatus()) {
            return result.createResSuccess(res);
        } else {
            return result.createResError(res);
        }
    } catch (err) {
        return res
            .status(400)
            .json(new ApiResponse(500, "Internal server", err, false));
    }
});

const GetPageList = asyncHandler(async (req, res) => {
    try {
        const result = await getPageList(DetailCrawerl, req.params);
        if (result.getStatus()) {
            return result.createResSuccess(res);
        } else {
            return result.createResError(res);
        }
    } catch (err) {
        return res
            .status(400)
            .json(new ApiResponse(500, "Internal server", err, false));
    }
});
module.exports = {
    CreateDetail,
    GetPageList,
};
