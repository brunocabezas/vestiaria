var keystone = require('keystone');
// var keystone = require('masonry-layout');

exports = module.exports = function (req, res) {
	var view = new keystone.View(req, res);
	var Works = keystone.list('Work');
	var locals = res.locals;
	view.query('works', keystone.list('Work').model.find().sort('publishedDate'));
	// Load work with workId url param
	const workSlug = req.params.slug;

	// Load the current post
	view.on('init', function (next) {
		var q = Works.model.findOne({
			slug : workSlug
		});
		q.exec(function (err, result) {
			locals.work = result;
			console.log(result.gallery)
			next(err);
		});
	});
	// Render the view
	view.render('work');
};
