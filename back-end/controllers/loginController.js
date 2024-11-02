const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs')
const User = require('../models/user');

exports.loginValidation = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Looking the user by email
    const user = await User.findOne({ email });
    if(!user)
        return res.status(404).json({ success: false, message: "User not found" });

    // Comparing the entered password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ success: false, message: 'Incorrect password' });
    }

    // Password matches
    return res.status(200).json({ success: true, user }); 
});