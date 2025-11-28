import { default as trainApi } from './trains';

const apiRoutes = {
  trains: trainApi,
};

export default (req, res) => {
  const urlParts = req.url.split('/');
  const apiEndpoint = urlParts[2];

  const handler = apiRoutes[apiEndpoint];
  if (handler && typeof handler === 'function') {
    res.statusCode = 200;
    res.end(JSON.stringify(handler(req, res)));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'API endpoint not found' }));
  }
};
