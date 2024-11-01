var express = require('express');
var router = express.Router();

// Require Controller Modules
const allPostsController = require("../controllers/allPostsController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// All Posts Page //
router.get('/allPosts', allPostsController.allPosts_List);

module.exports = router;
