const express = require("express");
const path = require("path");
const app = express();

// Production environment: serve the build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
  
  app.get('*', (_, res) => {
      res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
} 
// Development environment: forward the requests to localhost:5992
else if (process.env.NODE_ENV === 'development') {
    const { createProxyMiddleware } = require('http-proxy-middleware');

  app.use(createProxyMiddleware({
    target: 'http://localhost:5997',
    changeOrigin: true
  }));
}

const port =  5998;
app.listen(port, "0.0.0.0");

console.log('App is listening on port ' + port);
