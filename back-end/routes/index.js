var express = require('express');
var router = express.Router();

// Require Controller Modules
const allPostsController = require("../controllers/allPostsController");
const loginController = require("../controllers/loginController");
const createPostController = require("../controllers/createPostController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// All Posts Page //
router.get('/api/allPosts', allPostsController.allPosts_List);
router.post('/api/login', loginController.loginValidation);
router.post('/api/savePost', createPostController.savePost);

module.exports = router;
