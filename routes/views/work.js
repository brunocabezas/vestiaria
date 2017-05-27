var keystone = require('keystone');
// var keystone = require('masonry-layout');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);

	// Load the galleries by sortOrder
	view.query('works', keystone.list('Work').model.find().sort('publishedDate'));

	// Render the view
	view.render('work');
};
