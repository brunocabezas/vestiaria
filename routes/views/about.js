var keystone = require('keystone');
var Enquiry = keystone.list('Enquiry');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);

	view.query('works', keystone.list('Work').model.find().sort('publishedDate'));
	view.render('about');
};
