const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      // target: 'http://192.168.0.144:5002',
      target: 'http://112.222.157.156:5002',
      changeOrigin: true,
    })
  );
};
