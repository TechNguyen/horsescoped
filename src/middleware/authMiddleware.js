const jwt = require("jsonwebtoken");
const AppUser = require("../models/AppUser");
const ApiResponse = require("../utils/apiResponse");

const authorize = (allowedRoles = []) => {
    return async (req, res, next) => {
        try {
            // Get token from header
            const token = req.header("Authorization")?.replace("Bearer ", "");
            const cooks = req.cookies;
            if (!token && !cooks) {
                return res
                    .status(401)
                    .json(
                        new ApiResponse(401, "No token provided", null, false),
                    );
            }
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                // Get user with roles

                console.log(decoded);

                const user = await AppUser.findById(decoded.data._id).populate(
                    "roles",
                );
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
                req.user = JSON.parse(cooks.user);
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
