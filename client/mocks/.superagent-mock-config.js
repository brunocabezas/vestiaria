import superagent from 'superagent';
import superagentMock from 'superagent-mock';
import { routes } from '../src/actions';
const workRes = require('./video-and-gallery-work-get-response.json');
const worksRes = require('./works-get-response.json');
const homeGalleryRes = require('./home-gallery-get-response.json');

var logger = function(log)  {
  console.log('superagent call', log);
};

const config = [
  {
    pattern: /api/,
    fixtures: function(match, params, headers, context) {
			console.log(match.input,routes.works,)
      if (match.input.includes(routes.works)) {
        return worksRes;
      }
      if (match.input.includes(routes.work)) {
        return workRes;
      }
      if (match.input.includes(routes.homeGallery)) {
        return homeGalleryRes;
      }
    },
    get: (match, data) => ({
      status: 200,
      body: data,
			data,
      ok: true,
    })
  },
];

export default function() { return superagentMock(superagent, config, logger) }
