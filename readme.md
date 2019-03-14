# Vestiaria Portfolio site

Site hosted on [claudiarobles.com](http://claudiarobles.com)

Application built with:

- [KeystoneJS](https://github.com/keystonejs/keystone) - Node.js content management system.
- [ReactJS](https://reactjs.org/) - To compose the UI.
- [Jeet](http://jeet.gs/) - A grid system for humans.
- [Stylus](http://stylus-lang.com/) - CSS Framework.

## Next steps

- [ ] Remove `public/styles` folder
- [ ] Fix fonts route on for client
- [ ] Media query and mobile on work grid
- [ ] Url reacting to changes
- [ ] Change first picture
- [ ] Preload home gallery photos
- [ ] Compress photos on cloudinary
- [ ] https://ethanselzer.github.io/react-image-magnify/#/hint

## Development

### Available tasks

Main _npm_ tasks defined (there are some pre-hooks used):

```
start -› builds react app, copies it to public/ and starts keystone dev server
build -› builds react app, copies it to public/ and start keystone on port 80
start:react -› starts react app in dev env with parcel
build:react -› builds react app with parcel to client/dist
lint:react -› lints react app
```

### Installing dependencies

```
npm install
```

### Frontend

React is used to compose the UI, the app is on `client/` folder.

On development, mocks are required and defined on `client/index.html`; this act as entry point that mimics `templates/views/layouts/default.hbs` structure (used on production). To start the app on development, run:

```
npm start:react
```

For more info, please check on its README.md

### Backend

Type the following to run KeystoneJS backend server:

```
npm start
```

Its important to mention that **different services are used and they require a bit of setup**. Using an `.env` file is recommended, there you define:

- `CLOUDINARY_USER` Cloudinary hosts images, which is why a [cloudinary token](https://cloudinary.com/documentation/image_upload_api_reference) is needed
- `COOKIE_SECRET` Random string to [add security](https://keystonejs.netlify.com/getting-started/setting-up/part-1/)
- `MAILGUN_API_KEY` (optional)
- `MAILGUN_DOMAIN` (optional)

Also having a running [mongodb](https://docs.mongodb.com/) environment is required; keystone serve will connect trough port `27.017`.

This will serve up the application at `localhost:3000`

#### Templates and Client

KeystoneJS allow us to render backend data using Handlebars. Use of this template system must be limited to almost none, just enough to run the javascript app on `client/`.

The one and only `layouts/default.hbs` declares the basic to start a react-app plus some variables needed for this to work.
