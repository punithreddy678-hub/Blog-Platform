const express = require("express");

const {
    addComment,
    getComments,
    deleteComment
} = require("../controllers/commentController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Get comments for a post (public)
router.get("/:postId", getComments);

// Add comment (protected)
router.post("/", protect, addComment);

// Delete comment (protected)
router.delete("/:id", protect, deleteComment);

module.exports = router;