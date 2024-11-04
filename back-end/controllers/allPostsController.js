const asyncHandler = require("express-async-handler");
const Post = require("../models/post");
const User = require("../models/user");

exports.allPosts_List = asyncHandler(async (req, res, next) => {
    const allPosts = await Post.find().sort({ updatedAt: 1 }).populate('user').exec();
    
    res.json(allPosts);
});