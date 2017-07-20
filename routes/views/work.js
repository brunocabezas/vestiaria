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
			//  videoUrl its a valid parsed url to display vimeo and youtube videos
			var videoUrl = null;

			if (result.video.indexOf('vimeo')>=0){
				var splitted = result.video.split('/'),
					id = splitted[splitted.length-1];
				videoUrl = "https://player.vimeo.com/video/"+id;

			} else if (result.video.indexOf('youtube')>=0){
				var splitted = result.video.split('/watch?v='),
					id = splitted[splitted.length-1];
				videoUrl = "https://www.youtube.com/embed/"+id;
			};

			locals.work = result;
			locals.videoUrl = videoUrl;
			next(err);
		});
	});
	// Render the view
	view.render('work');
};
