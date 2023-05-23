const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;
const htmlPath = path.join(__dirname, 'public', 'index.html');

const server = http.createServer((req, res) => {
  fs.readFile(htmlPath, 'utf8', (err, htmlContent) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Internal Server Error');
      return;
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(htmlContent);
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
