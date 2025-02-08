const ApiHorsecoped = require("../models/ApiHorsecoped");
const getDataLaSo = require("../models/getDataLaSo");
const ApiResponse = require("../utils/apiResponse");
const {
    getPageList,
    getOne,
    updateOne,
    createOne,
    createMany,
    deleteOne,
} = require("../core/controllers/baseController");
const asyncHandler = require("express-async-handler");
const { default: axios } = require("axios");
const DetailCrawerl = require("../models/DetailCrawerl");

const getPageListApiHorsecoped = asyncHandler(async (req, res) => {
    try {
        const apiHorsecoped = await getPageList(ApiHorsecoped, req.query);
        if (apiHorsecoped.getStatus()) {
            return apiHorsecoped.createResSuccess(res);
        } else {
            return apiHorsecoped.createResError(res);
        }
    } catch (err) {
        res.status(500).json(
            new ApiResponse(500, "Internal server error", err, false),
        );
    }
});

const getOneApiHorsecoped = asyncHandler(async (req, res) => {
    try {
        const apiHorsecoped = await getOne(ApiHorsecoped, req.query.id);
        if (apiHorsecoped.getStatus()) {
            return apiHorsecoped.createResSuccess(res);
        } else {
            return apiHorsecoped.createResError(res);
        }
    } catch (err) {
        return res
            .status(500)
            .json(new ApiResponse(500, "Internal server error", err, false));
    }
});

const createApiHorsecoped = asyncHandler(async (req, res) => {
    try {
        const apiHorsecoped = await createOne(ApiHorsecoped, req.body);
        if (apiHorsecoped.getStatus()) {
            return apiHorsecoped.createResSuccess(res);
        } else {
            return apiHorsecoped.createResError(res);
        }
    } catch (err) {
        return res
            .status(500)
            .json(new ApiResponse(500, "Internal server error", err, false));
    }
});

const updateApiHorsecoped = asyncHandler(async (req, res) => {
    try {
        const apiHorsecoped = await updateOne(
            ApiHorsecoped,
            req.body.id,
            req.body,
        );
        if (apiHorsecoped.getStatus()) {
            return apiHorsecoped.createResSuccess(res);
        } else {
            return apiHorsecoped.createResError(res);
        }
    } catch (err) {
        return res
            .status(500)
            .json(new ApiResponse(500, "Internal server error", err, false));
    }
});

const deleteApiHorsecoped = asyncHandler(async (req, res) => {
    try {
        const apiHorsecoped = await deleteOne(ApiHorsecoped, req.body.id);
        if (apiHorsecoped.getStatus()) {
            return apiHorsecoped.createResSuccess(res);
        } else {
            return apiHorsecoped.createResError(res);
        }
    } catch (err) {
        return res
            .status(500)
            .json(new ApiResponse(500, "Internal server error", err, false));
    }
});

const requestApiToCrawel = asyncHandler(async (req, res) => {
    try {
        const { url } = req.body;
        const api = await ApiHorsecoped.findOne({
            url: url,
        });
        if (api) {
            if (api.method.toUpperCase() === "GET") {
                const data = await axios.get(url, req.body);
                if (data.data.msg?.status) {
                    const resultCreate = await createOne(
                        DetailCrawerl,
                        data.data.data,
                    );
                    if (resultCreate.getStatus()) {
                        return resultCreate.createResSuccess(res);
                    } else {
                        return resultCreate.createResError(res);
                    }
                } else {
                    return res
                        .status(404)
                        .json(
                            new ApiResponse(404, "Api not found", null, false),
                        );
                }
            } else if (api.method.toUpperCase() === "POST") {
                const data = await axios.post(url, req.body);

                if (data.data.msg?.status) {
                    const resultCreate = await createOne(
                        DetailCrawerl,
                        data.data.data,
                    );
                    if (resultCreate.getStatus()) {
                        return resultCreate.createResSuccess(res);
                    } else {
                        return resultCreate.createResError(res);
                    }
                } else {
                    return res
                        .status(404)
                        .json(
                            new ApiResponse(404, "Api not found", null, false),
                        );
                }
            }
        } else {
            return res
                .status(404)
                .json(new ApiResponse(404, "Api not found", null, false));
        }
    } catch (err) {
        return res
            .status(500)
            .json(new ApiResponse(500, "Internal server error", err, false));
    }
});

module.exports = {
    getPageListApiHorsecoped,
    getOneApiHorsecoped,
    createApiHorsecoped,
    updateApiHorsecoped,
    deleteApiHorsecoped,
    requestApiToCrawel,
};
