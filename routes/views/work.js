var keystone = require('keystone');
// var keystone = require('masonry-layout');

exports = module.exports = function (req, res) {
	var view = new keystone.View(req, res);
	var Works = keystone.list('Work');
	var locals = res.locals;
	// Load work with workId url param
	const workSlug = req.params.slug;

	// Load the current post
	view.on('init', function (next) {
		var q = 	Works.model.findOne({
			slug : workSlug
		});
		q.exec(function (err, result) {
			locals.work = result;
			next(err);
		});
	});

	// Render the view
	view.render('work');
};
