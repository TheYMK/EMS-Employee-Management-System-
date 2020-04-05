var express = require('express');
var router = express.Router();
var User = require('../../models/user');
var Blog = require('../../models/blog');
var Comment = require('../../models/comment');
var Company = require('../../models/company');
var Department = require('../../models/department');
var expressSanitizer = require('express-sanitizer');
var Employee = require('../../models/employee');
var middleware = require('../../middleware');

// CREATE - Create a new comment
router.post('/homeadmin/blogs/:id/comments', middleware.isLoggedIn, function(req, res) {
	Blog.findById(req.params.id, function(err, foundBlog) {
		if (err) {
			console.log(err);
			res.redirect('back');
		} else {
			//Create a comment
			Comment.create(req.body.comment, function(err, comment) {
				if (err) {
					console.log(err);
					res.redirect('back');
				} else {
					//add username and id to comment
					comment.author.id = req.user.id;
					comment.author.username = req.user.username;
					//save comment
					comment.save();
					foundBlog.comments.push(comment);
					foundBlog.save();
					req.flash('success', 'Comment added');
					res.redirect('/homeadmin/blogs/' + foundBlog._id);
				}
			});
		}
	});
});

// DELETE - delete a particular comment

router.delete('/homeadmin/blogs/:id/comments/:comment_id', middleware.checkCommentOwnership, function(req, res) {
	Comment.findByIdAndRemove(req.params.comment_id, function(err) {
		if (err) {
			res.redirect('back');
		} else {
			req.flash('success', 'Comment deleted');
			res.redirect('/homeadmin/blogs/' + req.params.id);
		}
	});
});

module.exports = router;
