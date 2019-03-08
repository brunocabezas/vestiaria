# Vestiaria Portfolio site

Site hosted on [claudiarobles.com](http://claudiarobles.com)

Application built with:

- [KeystoneJS](https://github.com/keystonejs/keystone) - Node.js content management system.
- [ReactJS](https://reactjs.org/) - To compose the UI.
- [Jeet](http://jeet.gs/) - A grid system for humans.
- [Stylus](http://stylus-lang.com/) - CSS Framework.
- [featherLight](https://noelboss.github.io/featherlight/) - Lightweight jQuery lightbox.

## Available tasks

The app has the following npm tasks defined:

```
start -› builds react app and start keystone development env
build -› builds react app and start keystone on port 80
start:react -› starts react app in dev env with parcel
build:react -› builds react app with parcel to public/js
lint -› lints react app
```

## Development

### Structure

KeystoneJS is using handlebars for templates on the view layer, therefore, all routes should have a corresponding `.hbs` file. Each view is rendering

### Installing dependencies

```
npm install
```

### Running keystone server

Different services are used and they require a bit of setup. Using an `.env` file is recommended, there you define:

- `CLOUDINARY_USER` Cloudinary hosts images, which is why a [cloudinary token](https://cloudinary.com/documentation/image_upload_api_reference) is needed
- `COOKIE_SECRET` Random string to [add security](https://keystonejs.netlify.com/getting-started/setting-up/part-1/)
- `MAILGUN_API_KEY` (optional)
- `MAILGUN_DOMAIN` (optional)

Also having a running [mongodb](https://docs.mongodb.com/) environment is required; keystone serve will connect trough port 27017.

This will serve up the application at `localhost:3000`
