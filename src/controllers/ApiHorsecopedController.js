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
                const dataLaSo = await createOne(getDataLaSo, {
                    url: api.url,
                    method: api.method,
                    ipRequest: req.ip,
                    requestBody: JSON.stringify(req.body),
                    data: JSON.stringify(data.data),
                });
                return res
                    .status(200)
                    .json(new ApiResponse(200, "Success", dataLaSo, true));
            } else if (api.method.toUpperCase() === "POST") {
                const lunarDate = {
                    year: req.body.year,
                    month: req.body.month,
                    day: req.body.day,
                };

                const solarDate = moment(lunarDate, "YYYY-MM-DD")
                    .lunar()
                    .lunarYear(lunarDate.year)
                    .lunarMonth(lunarDate.month)
                    .lunarDate(lunarDate.day)
                    .toDate();

                const data = await axios.post(url, req.body);
                const dataLaSo = await createOne(getDataLaSo, {
                    url: api.url,
                    method: api.method,
                    ipRequest: req.ip,
                    requestBody: JSON.stringify(req.body),
                    data: JSON.stringify(data.data),
                });
                return res
                    .status(200)
                    .json(new ApiResponse(200, "Success", dataLaSo, true));
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
