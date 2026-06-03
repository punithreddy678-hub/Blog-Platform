const express = require("express");

const {
    createPost,
    getPosts,
    getPost,
    updatePost,
    deletePost,
    likePost,
    bookmarkPost
} = require("../controllers/postController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Public Routes
router.get("/", getPosts);
router.get("/:id", getPost);

// Protected Routes
router.post("/", protect, createPost);

router.put("/like/:id", protect, likePost);

router.put("/bookmark/:id", protect, bookmarkPost);

router.put("/:id", protect, updatePost);

router.delete("/:id", protect, deletePost);

module.exports = router;