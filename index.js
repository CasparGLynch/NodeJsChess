const http = require('http');

const port = 3000;

const server = http.createServer((req, res) => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Hello World</title>
      </head>
      <body>
        <h1>Hello World!</h1>
      </body>
    </html>
  `;
  
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(html);
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

