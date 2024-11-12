const asyncHandler = require("express-async-handler");
const Post = require("../models/post");
const User = require("../models/user");
const mongoose = require("mongoose");

exports.allUsers_List = asyncHandler(async (req, res, next) => {
    const allUsers = await User.find().exec();
    
    res.status(200).json(allUsers);
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
    const { userId } = req.body; 
    // let user_id = mongoose.Types.ObjectId(userId);

    await Post.deleteMany({ user: userId });
    await User.deleteOne({ _id: userId });

    // return a success message
    return res.status(201).json({ success: true, message: "User Deleted Successfully" });
});
