
let net = require('net');
const fs = require('fs');

let text = fs.readFileSync(`./data/hello.txt`);

let serverLog = require('./lib/serverLog');

let SERVER_PORT = 2003;

let server = net.createServer(function(connection) {
  let clientAddress = connection.remoteAddress;

  serverLog('CONNECT', `Client at ${clientAddress} connected`);

  /*
    1. Read the contents of data/motd.txt into memory
    2. Send the contents do the client using connection.write(...)
    3. Close the connection
  */
  connection.write(`${text}\n`);
  connection.end(`Server closed\n`);
});

server.listen(SERVER_PORT, function() {
  serverLog('LISTENING', `MOTD server listening on port ${SERVER_PORT}`);
});
