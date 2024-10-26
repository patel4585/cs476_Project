const mongoose = require("mongoose");
require("mongoose-type-email");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: mongoose.SchemaTypes.Email, required: true },
    role: {
        type: String,
        required: true,
        enum: ["Normal User", "Admin User"],
        default: "Normal User",
    },
    password: { type: String, required: true },
});

// Virtual for User's full name
UserSchema.virtual("name").get(function () {
    let fullname = "";
    
    if(this.first_name && this.last_name) {
        fullname = `${this.first_name}, ${this.last_name}`;
    }

    return fullname;
});

// Export model
module.exports = mongoose.model("User", UserSchema);