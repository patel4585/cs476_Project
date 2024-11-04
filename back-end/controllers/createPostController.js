const asyncHandler = require("express-async-handler");
const Post = require("../models/post");
const mongoose = require("mongoose");

exports.savePost = asyncHandler(async (req, res, next) => {
    if (!req.body.post.user || !req.body.post.user._id) {
        return res.status(400).json({ success: false, message: "User ID is required" });
    }

    let user_id = new mongoose.Types.ObjectId(req.body.post.user._id);

    // Create a new instance of the Post model
    const post = new Post({
        user: user_id,
        amount_willing_to_pay: req.body.post.amount_willing_to_pay,
        amount_willing_to_pay_currency: req.body.post.amount_willing_to_pay_currency,
        desired_amount_in_return: req.body.post.desired_amount_in_return,
        desired_amount_in_return_currency: req.body.post.desired_amount_in_return_currency,
        additional_details: req.body.post.additional_details
    });

    // Save the new post to the database
    const savedPost = await post.save();

    // return a success message
    return res.status(201).json({ success: true, message: "Post Created Successfully" });
});
