var express = require('express');
var router = express.Router();

// Require Controller Modules
const allPostsController = require("../controllers/allPostsController");
const authController = require("../controllers/authController");
const createPostController = require("../controllers/createPostController");
const manageUsersController = require("../controllers/manageUsersController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// All Posts Page //
router.get('/api/allPosts', allPostsController.allPosts_List);
router.post('/api/login', authController.loginValidation);
router.post('/api/savePost', createPostController.savePost);
router.post('/api/signUp', authController.signUpValidation);
router.get('/api/getAllUsers', manageUsersController.allUsers_List);
router.post('/api/deleteUser', manageUsersController.deleteUser);
router.delete('/api/deletePost', allPostsController.deletePost);

module.exports = router;