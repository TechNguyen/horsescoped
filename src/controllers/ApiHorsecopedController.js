const ApiHorsecoped = require("../models/ApiHorsecoped");
const {
    getPageList,
    getOne,
    updateOne,
    createOne,
    createMany,
    deleteOne,
} = require("../core/controllers/baseController");
const asyncHandler = require("express-async-handler");

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
        const apiHorsecoped = await updateOne(ApiHorsecoped, req.body);
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
        const apiHorsecoped = await deleteOne(ApiHorsecoped, req.body);
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

module.exports = {
    getPageListApiHorsecoped,
    getOneApiHorsecoped,
    createApiHorsecoped,
    updateApiHorsecoped,
    deleteApiHorsecoped,
};
