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

exports.signUpValidation = asyncHandler(async (req, res, next) => {
  const { user } = req.body;
  const hashedPassword = await bcrypt.hash(user.password, 10);

  // Create a new instance of the user model
  const user01 = new User({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    role: user.role,
    password: hashedPassword
  });

  // Save the new User to the database
  const savedUser = await user01.save();

  // Retrun a success message
  return res.status(201).json({ success: true, message: "User Account Created Successfully"});
});