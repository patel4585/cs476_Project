const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount_willing_to_pay: { type: Number, required: true },
    amount_willing_to_pay_currency: { type: String, required: true },       // Use enum in the backend to restrict allowed currencies
    desired_amount_in_return: { type: Number, required: true },
    desired_amount_in_return_currency: { type: String, required: true },    // Use enum in the backend to restrict allowed currencies
    additional_details: { type: String }
}, { timestamps: true });   // timestamps set to true to use createdAt and updatedAt

module.exports = mongoose.model("Post", PostSchema);