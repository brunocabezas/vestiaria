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
	date  : { type: Date, default: Date.now },
	abstract : { type: Types.Textarea },
	gallery: { type: Types.CloudinaryImages },
	video : { type: String , default:""}
});

Work.defaultColumns = 'name|20%, heriImage|15%, createdBy, createdAt'
Work.register();
