// Actions to get data from the API
import superagent from 'superagent';
import setSuperAgentCfg from '../mocks/.superagent-mock-config';

// Only declaring default export on dev, to mock API requests
const isDev = process.env.NODE_ENV.includes('development');
if (isDev) {
  console.log('Enabling superagent mocks');
}
const defaultExport = !isDev ? {} : setSuperAgentCfg();

// API Routes
export const routes = {
  work: '/api/works/',
  homeGallery: '/api/home_gallery',
  works: 'api/works'
};

export const getWorks = () => {
  return superagent.get(routes.works);
};
export const getWork = slug => {
  return superagent.get(`${routes.work}${slug}`);
};
export const getHomeGallery = () => {
  return superagent.get(routes.homeGallery);
};
export default defaultExport;
