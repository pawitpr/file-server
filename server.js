const http = require('http');
const send = require('send');
const path = require('path');

const HOST = 'localhost';
const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log('Client connected.');

  const filepath = path.join(__dirname, req.url);
  send(req, filepath)
    .on('error', (err) => {
      res.statusCode = err.status || 500;
      res.end(err.message);
    })
    .on('directory', () => {
      res.statusCode = 301;
      res.setHeader('Location', req.url + '/');
      res.end('Redirecting to ' + req.url + '/');
    })
    .pipe(res)
    .on('close', () => {
      console.log('File sent successfully.');
    });
});

server.listen(PORT, HOST, () => {
  console.log(`Server listening on ${HOST}:${PORT}.`);
});
