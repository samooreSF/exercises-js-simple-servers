let net = require('net');
//let list = require('./list.js');

let serverLog = require('./lib/serverLog');

let SERVER_PORT = 2004;

let server = net.createServer(function(connection) {
  let clientAddress = connection.remoteAddress;
  connection.write('Enter the filename you wish to open \n');

  connection.on('data', function(clientData) {
    let args = clientData.toString().split(' ');
    let command = args[0];

    if (command === 'LIST') {

    } else if (command === 'GET') {
      let fileName = args[1];

    }
    let fileName = clientData.toString().trimRight();

    let filePath = `./data/${fileName}`;
    serverLog('RECEIVE', `Received data: ${fileName}`);
    const fs = require('fs');
    let text = fs.readFileSync(filePath);
    connection.write(`${text}\n`);
    connection.end('Server closed \n');
  });

  connection.on('end', function() {
    serverLog('DISCONNET', `Client ${clientAddress} disconnected`);
  });
});

server.listen(SERVER_PORT, function() {
  serverLog('LISTENING', `Echo server listening on port ${SERVER_PORT}`);
});
