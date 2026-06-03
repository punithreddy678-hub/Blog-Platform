const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

// Get All Users
const getUsers = async (req, res) => {

    try {

        const users = await User.find()
            .select("-password");

        res.json(users);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Get All Posts
const getPosts = async (req, res) => {

    try {

        const posts = await Post.find()
            .populate("author", "name email");

        res.json(posts);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Delete User
const deleteUser = async (req, res) => {

    try {

        const user =
            await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        await user.deleteOne();

        res.json({
            message: "User deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Delete Post
const deletePost = async (req, res) => {

    try {

        const post =
            await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        await post.deleteOne();

        res.json({
            message: "Post deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Dashboard Stats
const getStats = async (req, res) => {

    try {

        const users =
            await User.countDocuments();

        const posts =
            await Post.countDocuments();

        const comments =
            await Comment.countDocuments();

        res.json({
            users,
            posts,
            comments
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
    getUsers,
    getPosts,
    deleteUser,
    deletePost,
    getStats
};