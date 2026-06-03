const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    excerpt: {
        type: String
    },

    featuredImage: {
        type: String
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    category: {
        type: String,
        required: true
    },

    tags: [
        {
            type: String
        }
    ],

    views: {
        type: Number,
        default: 0
    },

   likes: [
{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
}
],

    status: {
        type: String,
        enum: ["draft", "published"],
        default: "draft"
    }
},
{
    timestamps: true
}
);

// Search Index
postSchema.index({
    title: "text",
    content: "text"
});

module.exports = mongoose.model("Post", postSchema);