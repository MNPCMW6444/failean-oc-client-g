const express = require("express");
const path = require("path");
const app = express();

  app.use(express.static(path.join(__dirname, 'build')));
  
  app.get('*', (_, res) => {
      res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });


const port =  5998;
app.listen(port, "0.0.0.0");

console.log('App is listening on port ' + port);
