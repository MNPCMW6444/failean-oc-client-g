const express = require("express");
const path = require("path");
const app = express();
const basicAuth = require('basic-auth');
require('dotenv').config();



const USERNAME = "mnpcmw";
const PASSWORD = "faileanizem8000";


app.use((req, res, next) => {
    const credentials = basicAuth(req);

    if (credentials && credentials.name === USERNAME && credentials.pass === PASSWORD) {
        return next();
    }

    res.setHeader('WWW-Authenticate', 'Basic realm="example"');
    res.status(401).send('Authentication required');
});




if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
  
  app.get('*', (_, res) => {
      res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
} 
else if (process.env.NODE_ENV === 'development') {
    const { createProxyMiddleware } = require('http-proxy-middleware');
console.log("devproxy")
  app.use(createProxyMiddleware({
    target: 'http://localhost:5997',
    changeOrigin: true
  }));
}

const port =  5998;
app.listen(port, "0.0.0.0");

console.log('App is listening on port ' + port);
