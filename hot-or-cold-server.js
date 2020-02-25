let net = require('net');

let serverLog = require('./lib/serverLog');
let randomInteger = require('./lib/randomInteger');

let SERVER_PORT = 2002;
let MAX_GUESS = 1000;

let server = net.createServer(function(connection) {
  let clientAddress = connection.remoteAddress;
  let numberToGuess = randomInteger(MAX_GUESS);

  serverLog('CONNECT', `Client at ${clientAddress} connected`);
  serverLog('INIT', `Number to guess: ${numberToGuess}`);

  connection.write(`Guess a number between 1 and ${MAX_GUESS}\n`);

  connection.on('data', function(clientData) {
    let userGuess = Number(clientData);

    serverLog('RECEIVE', `Received data: ${userGuess}`);

    if (!Number.isInteger(userGuess)) {
      // The user entered something other than an integer
      connection.write(`Response must be an integer!!!TRY AGAIN\n`);
      // Use connection.write(...) to print out a useful error message
      // and some instructions for the user.
    } else if (userGuess < numberToGuess) {
      // The user's guess was too small.
      // Use connection.write(...) to tell them they're too cold.
      connection.write(`Too cold, PICK AGAIN\n`);
    } else if (userGuess > numberToGuess) {
      // The user's guess was too large.
      // Use connection.write(...) to tell them they're too hot.
      connection.write(`Too hot, PICK AGAIN\n`);
    } else if (userGuess === numberToGuess) {
      // The user guessed correctly!
      connection.write(`You have one the Game; Congrats\n`);

      connection.end(`Now get off my server`);

      // Use connection.write(...) to tell them they guessed correctly
      // Use connection.end() to end the client connection
    }
  });

  // Print a log message when a client hangs up on us
  connection.on('end', function() {
    serverLog('DISCONNET', `Client ${clientAddress} disconnected`);
  });
});

server.listen(SERVER_PORT, function() {
  serverLog('LISTENING', `Hot-Or-Cold server listening on port ${SERVER_PORT}`);
});
