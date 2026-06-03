const Comment = require("../models/Comment");

// Add Comment
const addComment = async (req, res) => {
    try {
        const { content, postId, parentComment } = req.body;

        const comment = await Comment.create({
            content,
            post: postId,
            parentComment: parentComment || null,
            author: req.user._id
        });

        res.status(201).json(comment);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get Comments for a Post
const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({
            post: req.params.postId
        })
        .populate("author", "name email")
        .sort({ createdAt: -1 });

        res.json(comments);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Delete Comment
const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        if (comment.author.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                message: "Not authorized"
            });
        }

        await comment.deleteOne();

        res.json({
            message: "Comment deleted"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    addComment,
    getComments,
    deleteComment
};