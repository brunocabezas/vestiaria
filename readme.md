# Vestiaria Portfolio site

Site hosted on [claudiarobles.com](http://claudiarobles.com)

Application built with:

- [KeystoneJS](https://github.com/keystonejs/keystone) - Node.js content management system.
- [ReactJS](https://reactjs.org/) - To compose the UI.
- [Jeet](http://jeet.gs/) - A grid system for humans.
- [Stylus](http://stylus-lang.com/) - CSS Framework.

## Next steps

- [ ] Remove `public/styles` folder
- [ ] Fix fonts route on client
- [ ] Media query and mobile on work grid
- [ ] Change first picture
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

### Front-end app

React is used to create UI components, the app is located on [public/client](public/client).

On development env, some variables are mocked (on `client/index.html`); this to mimic entry point used with KeystoneJS as backend (`templates/views/layouts/default.hbs`) on production. To start the app on development, run:

```
npm start:react
```

For more info, please check on its [README.md](client/README.md)

### KeystoneJS Server

Type the following to run KeystoneJS server:

```bash
npm start  // Starts server using keystone.js as config file
```

Its important to mention that **different services are used and they require a bit of setup**. Using an `.env` file is recommended, there you define:

- `CLOUDINARY_USER` Cloudinary hosts images, which is why a [cloudinary token](https://cloudinary.com/documentation/image_upload_api_reference) is needed
- `COOKIE_SECRET` Random string to [add security](https://keystonejs.netlify.com/getting-started/setting-up/part-1/)
- `MAILGUN_API_KEY` (optional)
- `MAILGUN_DOMAIN` (optional)

For data, is required a running [mongodb](https://docs.mongodb.com/) environment; keystone server will connect (through port `27.017`) to mongo's instance.

This will serve up the application at `localhost:3000`

#### Templates and Client

KeystoneJS renders backend data via [Handlebars](https://handlebarsjs.com). Use of this template engine is limited to almost none, just enough to run the `client/` javascript app.

The one and only `layouts/default.hbs` declares the basic to start a react-app plus some env. variables needed.
