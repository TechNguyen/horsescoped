const jwt = require("jsonwebtoken");
const AppUser = require("../models/AppUser");
const ApiResponse = require("../utils/apiResponse");

const authorize = (allowedRoles = []) => {
    return async (req, res, next) => {
        try {
            // Get token from header
            const token = req.header("Authorization")?.replace("Bearer ", "");
            const cooks = req.cookies;

            console.log(token);

            if (!token && !cooks) {
                return res
                    .status(401)
                    .json(
                        new ApiResponse(401, "No token provided", null, false),
                    );
            } else if (token && !cooks) {
                console.log("1");

                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                // Get user with roles
                const user = await AppUser.findById(decoded.data._id)
                    .populate(
                        "roles", // Trường "roles" chứa mảng các ObjectId liên kết với AppUserRole
                    )
                    .exec();

                if (!user) {
                    return res
                        .status(401)
                        .json(
                            new ApiResponse(401, "User not found", null, false),
                        );
                }

                // Check if user has required role
                const userRoles = user.roles.map((role) => role.roleCode);
                const hasPermission = allowedRoles.some((role) =>
                    userRoles.includes(role),
                );

                if (!hasPermission && allowedRoles.length > 0) {
                    return res
                        .status(403)
                        .json(
                            new ApiResponse(
                                403,
                                "Access denied. Insufficient permissions",
                                null,
                                false,
                            ),
                        );
                }
                // Add user to request object
                req.user = user;
            } else {
                console.log("2");
                const user = JSON.parse(cooks.user);
                const hasPermission = allowedRoles.some((role) =>
                    user.role.includes(role),
                );

                if (!hasPermission && allowedRoles.length > 0) {
                    return res
                        .status(403)
                        .json(
                            new ApiResponse(
                                403,
                                "Access denied. Insufficient permissions",
                                null,
                                false,
                            ),
                        );
                }

                req.user = user;
            }

            // Verify token

            next();
        } catch (error) {
            return res
                .status(401)
                .json(new ApiResponse(401, "Invalid token", null, false));
        }
    };
};

module.exports = { authorize };
