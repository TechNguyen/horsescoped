const ParamsApi = require("../models/ParamsApi");
const asyncHandler = require("express-async-handler");
const ApiResponse = require("../utils/apiResponse");
const {
    getPageList,
    getOne,
    updateOne,
    createOne,
    deleteOne,
} = require("../core/controllers/baseController");
const ApiHorsecoped = require("../models/ApiHorsecoped");

const createByApiId = asyncHandler(async (req, res) => {
    try {
        const { apiId } = req.body;
        const apiHorsecoped = await getOne(ApiHorsecoped, apiId);
        if (!apiHorsecoped.getStatus()) {
            return apiHorsecoped.createResError(res);
        }
        const paramsApi = await createOne(ParamsApi, req.body);
        if (paramsApi.getStatus()) {
            return paramsApi.createResSuccess(res);
        } else {
            return paramsApi.createResError(res);
        }
    } catch (err) {
        return res
            .status(500)
            .json(new ApiResponse(500, "Internal server error", err, false));
    }
});
const getByApiId = asyncHandler(async (req, res) => {
    try {
        const { apiId } = req.params;
        const paramsApi = await getOne(ParamsApi, apiId);
        if (paramsApi.getStatus()) {
            return paramsApi.createResSuccess(res);
        } else {
            return paramsApi.createResError(res);
        }
    } catch (err) {
        return res
            .status(500)
            .json(new ApiResponse(500, "Internal server error", err, false));
    }
});

const update = asyncHandler(async (req, res) => {
    try {
        const { id } = req.body;

        const paramsApi = await updateOne(ParamsApi, id, req.body);
        if (paramsApi.getStatus()) {
            return paramsApi.createResSuccess(res);
        } else {
            return paramsApi.createResError(res);
        }
    } catch (err) {
        return res
            .status(500)
            .json(new ApiResponse(500, "Internal server error", err, false));
    }
});

const deleteParamsApi = asyncHandler(async (req, res) => {
    try {
        const { id } = req.body;
        const paramsApi = await deleteOne(ParamsApi, id);
        if (paramsApi.getStatus()) {
            return paramsApi.createResSuccess(res);
        } else {
            return paramsApi.createResError(res);
        }
    } catch (err) {
        return res
            .status(500)
            .json(new ApiResponse(500, "Internal server error", err, false));
    }
});

const getPageListParamsApi = asyncHandler(async (req, res) => {
    try {
        const paramsApi = await getPageList(ParamsApi, req.query);
        if (paramsApi.getStatus()) {
            return paramsApi.createResSuccess(res);
        } else {
            return paramsApi.createResError(res);
        }
    } catch (err) {
        return res
            .status(500)
            .json(new ApiResponse(500, "Internal server error", err, false));
    }
});

module.exports = {
    createByApiId,
    getByApiId,
    update,
    deleteParamsApi,
    getPageListParamsApi,
};
