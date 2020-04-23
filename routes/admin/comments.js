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
router.post('/blogs/:id/comments', middleware.isLoggedIn, async (req, res) => {
	try {
		const foundBlog = await Blog.findById(req.params.id);
		const comment = await Comment.create(req.body.comment);

		//add username and id to comment
		comment.author.id = req.user.id;
		comment.author.username = req.user.username;
		//save comment
		await comment.save();
		foundBlog.comments.push(comment);
		await foundBlog.save();
		req.flash('success', 'Comment added');
		return res.redirect('/blogs/' + foundBlog._id);
	} catch (err) {
		console.log(err);
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

// DESTROY - delete a particular comment
router.delete('/blogs/:id/comments/:comment_id', middleware.checkCommentOwnership, async (req, res) => {
	try {
		await Comment.findByIdAndRemove(req.params.comment_id);

		req.flash('success', 'Comment deleted');
		return res.redirect('/blogs/' + req.params.id);
	} catch (err) {
		req.flash('error', err.message);
		return res.redirect('back');
	}
});

module.exports = router;
