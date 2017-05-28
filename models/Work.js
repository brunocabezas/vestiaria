var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Work Model
 * =============
 */

var Work = new keystone.List('Work', {
	autokey: { from: 'name', path: 'slug', unique: true },
});
Work.add({
	name: { type: String, required: true },
	heroImage: { type: Types.CloudinaryImage },
	publishedDate: { type: Date, default: Date.now },
	date  : { type: Date, default: Date.now },
	abstract : { type: String },
	gallery: { type: Types.CloudinaryImages },
	video : { type: String }
});

Work.defaultColumns = 'name|20%, heriImage|15%, createdBy, createdAt';
Work.register();
