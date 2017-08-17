/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */
var babelify = require('babelify');
var browserify = require('browserify-middleware');
var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
};

var Gallery = keystone.list('Gallery');
var Work = keystone.list('Work');

// Setup Route Bindings
exports = module.exports = function (app) {
	// Views
	app.use('/js', browserify('./client', {
		transform: [babelify.configure({
			presets : ["react","es2015"],
			plugins: ['transform-object-rest-spread']
		})],
	}));

	app.get('/api/home_gallery', function (req ,res) {
	    Gallery.model.findOne()
				.where('name','home_gallery')
				.exec()
				.then(function (data) {
	            res.send({
	                code: 200,
	                data: data
	            })
	        }, function(err){
	            res.send({
	                code: 500,
	                error: err
	            })
	        });
	});

	app.get('/api/works', function (req ,res) {
			Work.model.find()
				.sort('publishedDate')
				.exec()
				.then(function (data) {
							res.send({
									code: 200,
									data: data
							})
					}, function(err){
							res.send({
									code: 500,
									error: err
							})
					});
	});

	app.get('/api/works/:slug', function (req ,res) {
			Work.model.findOne({slug : req.params.slug})
				.exec().then(function (data) {
							res.send({
									code: 200,
									data: data
							})
					}, function(err){
							res.send({
									code: 500,
									error: err
							})
					});
	});
	app.get('/', routes.views.index);
	app.get('/gallery', routes.views.gallery);
	app.get('/works/:slug', routes.views.work);
	app.get('/about', routes.views.about);
	app.all('/contact', routes.views.contact);

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

};
