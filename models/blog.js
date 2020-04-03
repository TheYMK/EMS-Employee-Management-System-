var mongoose = require('mongoose');

//Blog DB schema
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	content: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		username: String
	},
	createdAt: { type: Date, default: Date.now },
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment'
		}
	]
});

blogSchema.pre('remove', async function(next) {
	try {
		await Comment.remove({
			_id: {
				$in: this.comments
			}
		});
	} catch (err) {
		next(err);
	}
});

module.exports = mongoose.model('Blog', blogSchema);
