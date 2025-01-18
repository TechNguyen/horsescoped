const express = require("express");
const router = express.Router();
const { authorize } = require("../middleware/authMiddleware");
const {
    login,
    signup,
    restPassword,
    getPageListUser,
    getUserById,
} = require("../controllers/AppUserController");

// Public routes
router.post("/login", login);
router.post("/sign-up", signup);
router.post("/reset-password", restPassword);
// Protected route - only ADMIN can access
router.get("/page-list", authorize(["ADMIN"]), getPageListUser);
router.get("/me", authorize(["ADMIN", "USER"]), getUserById);
module.exports = router;
