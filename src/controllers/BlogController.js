const Blog = require("../models/Blog");
const TaiLieuDinhKem = require("../models/TaiLieuDinhKem");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("express-async-handler");

const {
    createOne,
    getPageList,
    deleteOne,
} = require("../core/controllers/baseController");

const CreateBlog = asyncHandler(async (req, res) => {
    try {
        const {
            title,
            content,
            description,
            keyword,
            meta,
            status,
            slug,
            ThumnailsId,
        } = req.body;
        const blog = await createOne(Blog, {
            title,
            content,
            description,
            keyword,
            meta,
            status,
            slug,
            ThumnailsId,
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
            if (result.data.items && result.data.items.length > 0) {
                // Dùng Promise.all để chờ tất cả các truy vấn findById hoàn thành
                result.data.items = await Promise.all(
                    result.data.items.map(async (blog) => {
                        if (blog.ThumnailsId) {
                            const atachData = await TaiLieuDinhKem.findById(
                                blog.ThumnailsId,
                            );
                            if (atachData) {
                                return {
                                    ...blog.toObject(),
                                    thumbUrl: atachData.FilePath,
                                };
                            }
                        }
                        return blog;
                    }),
                );
            }

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

const GetBlogBySlug = asyncHandler(async (req, res) => {
    try {
        const { slug } = req.query;
        const result = await Blog.find({
            slug: slug,
        }).exec();
        return res
            .status(200)
            .json(new ApiResponse(200, "Success", result, true));
    } catch (err) {
        return res
            .status(500)
            .json(new ApiResponse(500, "Failed", null, false));
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
    GetBlogBySlug,
    deleteBlog,
};
