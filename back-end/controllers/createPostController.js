const asyncHandler = require("express-async-handler");
const Post = require("../models/post");
const mongoose = require("mongoose");

exports.savePost = asyncHandler(async (req, res, next) => {
    if (!req.body.post.user || !req.body.post.user._id) {
        return res.status(400).json({ success: false, message: "User ID is required" });
    }

    let post = null;

    // Create a new/Edit a instance of the Post model
    if(req.body.post._id == "PlaceHolder") {
        post = new Post({
            user: req.body.post.user._id,
            amount_willing_to_pay: req.body.post.amount_willing_to_pay,
            amount_willing_to_pay_currency: req.body.post.amount_willing_to_pay_currency,
            desired_amount_in_return: req.body.post.desired_amount_in_return,
            desired_amount_in_return_currency: req.body.post.desired_amount_in_return_currency,
            additional_details: req.body.post.additional_details
        });
    } else {
        post = await Post.findById(req.body.post._id);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        post.amount_willing_to_pay = req.body.post.amount_willing_to_pay;
        post.amount_willing_to_pay_currency = req.body.post.amount_willing_to_pay_currency;
        post.desired_amount_in_return = req.body.post.desired_amount_in_return;
        post.desired_amount_in_return_currency = req.body.post.desired_amount_in_return_currency;
        post.additional_details = req.body.post.additional_details;
    }

    // Save the new post to the database
    const savedPost = await post.save();

    if (!savedPost) {
        return res.status(500).json({ success: false, message: "Post could not be saved" });
    }

    return res.status(201).json({ success: true, message: "Post Created/Edited Successfully", post: savedPost });
});
