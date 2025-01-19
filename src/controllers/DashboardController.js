const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("express-async-handler");
const getDataLaSo = require("../models/getDataLaSo");
const AppUser = require("../models/AppUser");
const getDataUserController = asyncHandler(async (req, res) => {
    try {
        const data = await AppUser.countDocuments();
        return res.status(200).json(
            new ApiResponse(
                200,
                "Get data dashboard success",
                [
                    {
                        label: "Tống số user",
                        value: data,
                    },
                ],
                true,
            ),
        );
    } catch (err) {
        return res
            .status(500)
            .json(new ApiResponse(500, "Internal server error", err, false));
    }
});

const getDataLaSoController = asyncHandler(async (req, res) => {
    try {
        const currentYear = new Date().getFullYear();

        const data = await getDataLaSo.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(`${currentYear}-01-01`), // Từ ngày 1 tháng 1
                        $lte: new Date(`${currentYear}-12-31`), // Đến ngày 31 tháng 12
                    },
                },
            },
            {
                $group: {
                    _id: { $month: "$createdAt" }, // Nhóm theo tháng
                    count: { $sum: 1 }, // Đếm số lượng truy cập
                },
            },
            {
                $sort: { _id: 1 }, // Sắp xếp theo tháng (từ 1 -> 12)
            },
        ]);

        // Chuyển đổi dữ liệu để đảm bảo mỗi tháng (1-12) đều có giá trị
        const monthlyData = Array.from({ length: 12 }, (_, i) => ({
            month: i + 1,
            count: data.find((item) => item._id === i + 1)?.count || 0,
        }));

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    "Get data dashboard success",
                    monthlyData,
                    true,
                ),
            );
    } catch (err) {
        return res
            .status(500)
            .json(new ApiResponse(500, "Internal server error", err, false));
    }
});

module.exports = {
    getDataUserController,
    getDataLaSoController,
};
