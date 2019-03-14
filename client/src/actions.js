// ./server.js file
import request from 'superagent';
import superagentMock from 'superagent-mock';
import config from '../.superagent-mock-config';

const isDev = process.env.NODE_ENV.includes('development');
const defaultExport = !isDev ? {} : superagentMock(request, config);

if (isDev) {;
	console.log('Enabling superagent mocks')
}
// Before tests
export default defaultExport;
