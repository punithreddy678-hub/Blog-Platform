const Post = require("../models/Post");

// Create Post
const createPost = async (req, res) => {

    try {

        const post = await Post.create({
            ...req.body,
            author: req.user._id
        });

        res.status(201).json(post);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Get All Posts + Search + Pagination
const getPosts = async (req, res) => {

    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 6;
        const search = req.query.search || "";

        const skip = (page - 1) * limit;

        const query = search
            ? {
                $or: [
                    {
                        title: {
                            $regex: search,
                            $options: "i"
                        }
                    },
                    {
                        content: {
                            $regex: search,
                            $options: "i"
                        }
                    }
                ]
            }
            : {};

        const total =
            await Post.countDocuments(query);

        const posts =
            await Post.find(query)
                .populate("author", "name email")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);

        res.json({
            posts,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalPosts: total
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Get Single Post
const getPost = async (req, res) => {

    try {

        const post = await Post.findById(req.params.id)
            .populate("author", "name email");

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        post.views += 1;
        await post.save();

        res.json(post);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// Update Post
const updatePost = async (req, res) => {

    try {

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        if (
            post.author.toString() !==
            req.user._id.toString()
        ) {
            return res.status(401).json({
                message: "Not authorized"
            });
        }

        const updatedPost =
            await Post.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true
                }
            );

        res.json(updatedPost);

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

        if (
            post.author.toString() !==
            req.user._id.toString()
        ) {
            return res.status(401).json({
                message: "Not authorized"
            });
        }

        await post.deleteOne();

        res.json({
            message: "Post deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


const likePost = async (req, res) => {

    try {

        const post =
            await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        const alreadyLiked =
            post.likes.includes(req.user._id);

        if (alreadyLiked) {

            post.likes =
                post.likes.filter(
                    id =>
                    id.toString() !==
                    req.user._id.toString()
                );

            await post.save();

            return res.json({
                message: "Post unliked",
                likes: post.likes.length
            });
        }

        post.likes.push(req.user._id);

        await post.save();

        res.json({
            message: "Post liked",
            likes: post.likes.length
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
const User = require("../models/User");

const bookmarkPost = async (req, res) => {

    try {

        const user =
            await User.findById(req.user._id);

        const postId =
            req.params.id;

        const exists =
            user.bookmarks.includes(postId);

        if (exists) {

            user.bookmarks =
                user.bookmarks.filter(
                    id =>
                    id.toString() !== postId
                );

            await user.save();

            return res.json({
                message:
                "Bookmark removed"
            });
        }

        user.bookmarks.push(postId);

        await user.save();

        res.json({
            message:
            "Post bookmarked"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};
module.exports = {
    createPost,
    getPosts,
    getPost,
    updatePost,
    deletePost,
    likePost,
    bookmarkPost
};