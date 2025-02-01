const Blog = require("../models/Blog");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("express-async-handler");
const {
    createOne,
    getPageList,
    deleteOne,
} = require("../core/controllers/baseController");

const CreateBlog = asyncHandler(async (req, res) => {
    try {
        const { title, content, description, keyword, meta, status, slug } =
            req.body;
        const blog = await createOne(Blog, {
            title,
            content,
            description,
            keyword,
            meta,
            status,
            slug,
        });
        if (blog.getStatus()) {
            return blog.createResSuccess(res);
        } else {
            return blog.createResError(res);
        }
    } catch (error) {
        return res
            .status(500)
            .json(new ApiResponse(500, "Create blog failed", null, false));
    }
});

const getBlog = asyncHandler(async (req, res) => {
    try {
        const result = await getPageList(Blog, req.params);

        if (result.getStatus()) {
            return result.createResSuccess(res);
        } else {
            return result.createResError(res);
        }
    } catch (err) {
        return res
            .status(500)
            .json(new ApiResponse(500, "Create blog failed", null, false));
    }
});

const deleteBlog = asyncHandler(async (req, res) => {
    try {
        const result = await deleteOne(Blog, req.params.id);
        if (result.getStatus()) {
            return result.createResSuccess(res);
        } else {
            return result.createResError(res);
        }
    } catch (err) {
        return res
            .status(500)
            .json(new ApiResponse(500, "Failed", null, false));
    }
});
module.exports = {
    CreateBlog,
    getBlog,
    deleteBlog,
};
