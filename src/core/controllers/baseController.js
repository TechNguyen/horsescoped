const ApiResponse = require("../../utils/apiResponse");
const ApiFeatures = require("../../utils/apiFeatures");
const Pagination = require("../../constant/pagination");
const createOne = async (Model, data) => {
    try {
        const doc = await Model.create(data);
        return new ApiResponse(201, "Document created successfully", doc, true);
    } catch (error) {
        return new ApiResponse(500, "Internal server error", error, false);
    }
};
const createMany = async (Model, data) => {
    try {
        const docs = await Model.insertMany(data);
        return new ApiResponse(
            201,
            "Documents created successfully",
            docs,
            true,
        );
    } catch (error) {
        return new ApiResponse(500, "Internal server error", error, false);
    }
};
const deleteOne = async (Model, id) => {
    try {
        const doc = await Model.findByIdAndDelete(id);
        if (!doc) {
            return new ApiResponse(404, "Document not found", null, false);
        } else {
            return new ApiResponse(
                200,
                "Document deleted successfully",
                doc,
                true,
            );
        }
    } catch (error) {
        return new ApiResponse(500, "Internal server error", error, false);
    }
};
const updateOne = async (Model, id, data) => {
    try {
        const doc = await Model.findByIdAndUpdate(id, data, { new: true });
        if (!doc) {
            throw new ApiError(404, "Document not found", null, false);
        } else {
            return new ApiResponse(
                200,
                "Document updated successfully",
                doc,
                true,
            );
        }
    } catch (error) {
        return new ApiResponse(500, "Internal server error", error, false);
    }
};

const getPageList = async (Model, queryString) => {
    try {
        const { pageIndex, pageSize, search } = queryString;
        const pagination = new Pagination(pageIndex, pageSize);
        // Tạo điều kiện tìm kiếm động dựa trên searchFields
        const querySearch = search
            ? {
                  $or: searchFields.map((field) => ({
                      [field]: { $regex: search, $options: "i" },
                  })),
              }
            : {};
        const query = Model.find(querySearch);
        const total = await Model.countDocuments(querySearch);
        const data = await query
            .skip(pagination.getSkip())
            .limit(pagination.getLimit());
        pagination.setTotalItems(total);
        pagination.setTotalPages(
            Math.ceil(pagination.getTotalItems() / pagination.getLimit()),
        );
        pagination.setItems(data);
        return new ApiResponse(200, "Get success", pagination, true);
    } catch (err) {
        return new ApiResponse(500, "Internal server error", err, false);
    }
};

const getOne = async (Model, id) => {
    try {
        const doc = await Model.findById(id);
        if (!doc) {
            return new ApiResponse(404, "Document not found", null, false);
        } else {
            return new ApiResponse(
                200,
                "Document fetched successfully",
                doc,
                true,
            );
        }
    } catch (error) {
        return new ApiResponse(500, "Internal server error", error, false);
    }
};

module.exports = {
    createOne,
    deleteOne,
    updateOne,
    getOne,
    createMany,
    getPageList,
};
