const workRes = require('./mocks/video-and-gallery-work-get-response.json');
// ./superagent-mock-config.js file
const apiRoutes = {
	singleWork: '/api/works/falabella-liquidacion'
};

module.exports = [
  {
    /**
     * regular expression of URL
     */
    pattern: apiRoutes.singleWork,
    fixtures: function (match, params, headers, context) {
      if (match[1] === apiRoutes.singleWork) {
        return;
      }
		},
    get: function (match, data) {
      return {
        body: workRes,
				ok: true,
      };
    },
	}
];
