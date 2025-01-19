const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("express-async-handler");
const getDataLaSo = require("../models/getDataLaSo");

const { getPageList, getOne } = require("../core/controllers/baseController");
const GetPageListDataLaSo = asyncHandler(async (req, res) => {
    try {
        const data = await getPageList(getDataLaSo, req.query);
        if (data.getStatus()) {
            return data.createResSuccess(res);
        } else {
            return data.createResError(res);
        }
    } catch (err) {
        return res
            .status(500)
            .json(new ApiResponse(500, "Internal server error", err, false));
    }
});

module.exports = {
    GetPageListDataLaSo,
};
