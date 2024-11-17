const asyncHandler = require("express-async-handler");
const Post = require("../models/post");
const User = require("../models/user");

exports.allPosts_List = asyncHandler(async (req, res, next) => {
    const allPosts = await Post.find().sort({ updatedAt: -1 }).populate('user').exec();
    
    return res.status(200).json(allPosts);
});

exports.deletePost = asyncHandler(async (req, res, next) => {
    const { postId } = req.body;

    await Post.deleteOne({_id: postId});

    return res.status(200).json({ success: true, message: "Post Deleted Successfully" });
});

exports.getPost = asyncHandler(async (req, res, next) => {
    const { postId } = req.body;

    const post = await Post.findOne({ _id: postId });
    if (!post) {
        return res.status(404).json({ success: false, message: "Post not found" });
    }

    return res.status(200).json({ success: true, message: "Post returned successfully", post });
});