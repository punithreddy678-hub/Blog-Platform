const express = require("express");

const {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    forgotPassword,
    resetPassword,
    sendVerification,
    verifyEmail
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post(
    "/reset-password/:token",
    resetPassword
);
router.post(
    "/send-verification",
    protect,
    sendVerification
);

router.get(
    "/verify-email/:token",
    verifyEmail
);
// Profile
router.get("/profile", protect, getProfile);

module.exports = router;