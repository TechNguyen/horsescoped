const Blog = require("../models/Blog");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("express-async-handler");
const { createOne } = require("../core/controllers/baseController");

const CreateBlog = asyncHandler(async (req, res) => {
    try {
        const { title, content, description, keyword } = req.body;
        const blog = await createOne(Blog, {
            title,
            content,
            description,
            keyword,
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

module.exports = {
    CreateBlog,
};
