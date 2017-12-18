// importar as config do server
var app = require('./config/server');

// parametrizar a posta d escuta da porta 80 padrao
var serverPort = app.listen(8080, function() {
  console.log("servidor online!");
});

//inicia o websocket na mesma porta do protocolo http
require('socket.io').listen(serverPort);
