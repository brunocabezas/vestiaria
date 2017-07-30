var keystone = require('keystone');
var Work = keystone.list('Work');
var Gallery = keystone.list('Gallery');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Load the galleries by sortOrder
	var works = Work.model.find()
		.sort('publishedDate');


	var gallery = Gallery.model.findOne()
		.where('name','home_gallery');

	view.query('works', works);
	view.query('gallery', gallery); // locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	// Render the view
	view.render('index');
};
