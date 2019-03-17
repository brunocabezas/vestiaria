// ./server.js file
import superagent from 'superagent';
import setSuperAgentCfg from '../mocks/.superagent-mock-config';

const isDev = process.env.NODE_ENV.includes('development');
const defaultExport = !isDev ? {} : setSuperAgentCfg();

if (isDev) {;
	console.log('Enabling superagent mocks')
}

export const routes = {
  work: '/api/works/',
  homeGallery: '/api/home_gallery',
	works: 'api/works'
};

export const getWorks = () => {
	return superagent.get(routes.works);
};
export const getWork = (slug) => {
	return superagent.get(`${routes.work}${slug}`);
};
export const getHomeGallery = () => {
	return superagent.get(routes.homeGallery);
};
export default defaultExport;
