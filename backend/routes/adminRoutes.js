const express = require("express");

const {
    getUsers,
    getPosts,
    deleteUser,
    deletePost,
    getStats
} = require("../controllers/adminController");

const { protect } =
require("../middleware/authMiddleware");

const admin =
require("../middleware/adminMiddleware");

const router = express.Router();

router.get(
    "/users",
    protect,
    admin,
    getUsers
);

router.get(
    "/posts",
    protect,
    admin,
    getPosts
);

router.delete(
    "/user/:id",
    protect,
    admin,
    deleteUser
);

router.delete(
    "/post/:id",
    protect,
    admin,
    deletePost
);

router.get(
    "/stats",
    protect,
    admin,
    getStats
);

module.exports = router;