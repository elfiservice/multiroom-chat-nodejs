// importar as config do server
var app = require('./config/server');

// parametrizar a posta d escuta da porta 80 padrao
var serverPort = app.listen(8080, function() {
  console.log("servidor online!");
});

//inicia o websocket na mesma porta do protocolo http
var io = require('socket.io').listen(serverPort);

//criar uma conexao do websocket
//informando q estamos escutando Eventos de conexao
//é executado quando uma tentativa d conexao é executado do lado do cliente (instancia do obj io)
//socket (o parameto) é a conexao criada retornada por cb
io.on('connection', function(socket){
  console.log('user COnectado no Chat!');

  //usa a conexao socket para criar uma escuta de um evento de deisconexao do chat ( quando a instancia do obj io nao existir mais)
  socket.on('disconnect', function(){
    console.log('user Desconectou do Chat');
  });
});
