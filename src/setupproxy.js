const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(createProxyMiddleware('/user/signup', { target: 'http://localhost:3001/' }))
  app.use(createProxyMiddleware('/user/login', { target: 'http://localhost:3002/' }))
}