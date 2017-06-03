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
			next(err);
		});
		console.log(req,res)
    // This is the URL of the video you want to load
    var videoUrl = 'http://www.vimeo.com/7100569';
    // This is the oEmbed endpoint for Vimeo (we're using JSON)
    // (Vimeo also supports oEmbed discovery. See the PHP example.)
    var endpoint = 'http://www.vimeo.com/api/oembed.json';
    // Tell Vimeo what function to call
    var callback = 'embedVideo';
    // Put together the URL
    var url = endpoint + '?url=' + encodeURIComponent(videoUrl) + '&callback=' + callback + '&width=640';
    // This function puts the video on the page
    function embedVideo(video) {
        // document.getElementById('embed').innerHTML = unescape(video.html);
    }
    // This function loads the data from Vimeo
    function init() {
        // var js = document.createElement('script');
        // js.setAttribute('type', 'text/javascript');
        // js.setAttribute('src', url);
        // document.getElementsByTagName('head').item(0).appendChild(js);
    }
		console.log(url)
		init();

	});
	// Render the view
	view.render('work');
};
