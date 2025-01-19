const AppUser = require("../models/AppUser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const ApiResponse = require("../utils/apiResponse");
const AppRole = require("../models/AppRole");
const AppUserRole = require("../models/AppUserRole");
const { generateToken } = require("../helper/TokenHelper");
const { getPageList, getOne } = require("../core/controllers/baseController");

// @desc   signup user
// @route   POST /api/users/signup
// @access  Public
const signup = asyncHandler(async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;

        // Validate input
        if (!username || !email || !phone || !password) {
            return res
                .status(400)
                .json(
                    new ApiResponse(400, "Please fill all fields", null, false),
                );
        }

        // Check if user exists
        const userExists = await AppUser.findOne({ email });
        if (userExists) {
            return res
                .status(400)
                .json(new ApiResponse(400, "User already exists", null, false));
        }
        const phoneExits = await AppUser.findOne({ phone });
        if (phoneExits) {
            return res
                .status(400)
                .json(
                    new ApiResponse(400, "Phone already exists", null, false),
                );
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        // Create user
        const user = await AppUser.create({
            username,
            email,
            phone,
            passwordHash,
        });

        if (user) {
            const role = await AppRole.findOne({ roleCode: "USER" });
            if (role) {
                await AppUserRole.create({
                    userId: user._id,
                    roleId: role._id,
                });
            }
            return res.status(201).json(
                new ApiResponse(
                    201,
                    "Create user success",
                    {
                        _id: user.id,
                        username: user.username,
                        email: user.email,
                        phone: user.phone,
                        token: generateToken({
                            username: user.username,
                            email: user.email,
                            phone: user.phone,
                            role: user.role,
                        }),
                        role: user.role,
                    },
                    true,
                ),
            );
        } else {
            return res
                .status(400)
                .json(new ApiResponse(400, "Invalid user data", null, false));
        }
    } catch (err) {
        return res
            .status(500)
            .json(new ApiResponse(500, "Internal server error", err, false));
    }
});

// @desc    Authenticate user
// @route   POST /api/users/login
// @access  Public
const login = asyncHandler(async (req, res) => {
    try {
        const { username, password } = req.body;
        // Check for user email
        const user = await AppUser.findOne({ username });
        if (
            user &&
            !user.isLockedOut &&
            (await bcrypt.compare(password, user.passwordHash))
        ) {
            await AppUser.findByIdAndUpdate(user._id, { countFailedLogin: 0 });

            const role = await AppUserRole.findOne({ userId: user._id });
            const roleCode = await AppRole.findOne({ _id: role.roleId });
            const dataRes = {
                _id: user.id,
                username: user.username,
                email: user.email,
                phone: user.phone,
                role: roleCode.roleCode,
            };
            dataRes.token = generateToken(dataRes);
            return res
                .status(200)
                .json(new ApiResponse(200, "Login success", dataRes, true));
        } else {
            if (user) {
                const newFailedCount = user.countFailedLogin + 1;
                const updates = {
                    countFailedLogin: newFailedCount,
                    isLockedOut: newFailedCount >= 5,
                };
                await AppUser.findByIdAndUpdate(user._id, updates);
            }
            return res
                .status(401)
                .json(new ApiResponse(401, "Invalid credentials", null, false));
        }
    } catch (err) {
        return res
            .status(500)
            .json(new ApiResponse(500, "Internal server error", err, false));
    }
});

// @desc    RestPassword
// @route   POST /api/users/rest-password
// @access  publish
const restPassword = asyncHandler(async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await AppUser.findOne({
            username,
        });
        if (user) {
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);
            await AppUser.findByIdAndUpdate(user._id, { passwordHash });
            return res
                .status(200)
                .json(
                    new ApiResponse(200, "Rest password success", null, true),
                );
        } else {
            return res
                .status(404)
                .json(new ApiResponse(404, "User not found", null, false));
        }
    } catch (err) {
        return res
            .status(500)
            .json(new ApiResponse(500, "Internal server error", err, false));
    }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getPageListUser = asyncHandler(async (req, res) => {
    try {
        const users = await getPageList(AppUser, req.query);
        if (users.getStatus()) {
            return users.createResSuccess(res);
        } else {
            return users.createResError(res);
        }
    } catch (err) {
        return res
            .status(500)
            .json(new ApiResponse(500, "Internal server error", err, false));
    }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getUserById = asyncHandler(async (req, res) => {
    try {
        const user = await getOne(AppUser, req.query.id);
        if (user.getStatus()) {
            return user.createResSuccess(res);
        } else {
            return user.createResError(res);
        }
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json(new ApiResponse(500, "Internal server error", err, false));
    }
});

module.exports = {
    signup,
    login,
    restPassword,
    getPageListUser,
    getUserById,
};
