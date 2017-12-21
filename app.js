// importar as config do server
var app = require('./config/server');

// parametrizar a posta d escuta da porta 80 padrao
var serverPort = app.listen(8080, function() {
  console.log("servidor online!");
});

//inicia o websocket na mesma porta do protocolo http
var io = require('socket.io').listen(serverPort);

//Criando uma variavel global dentro da Aplicação para ser acessada do controller chat.js
app.set('io', io);

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

  //escuta o emit da view Chat com uma nova mensagem para retornar a mensagwm para todos os usuarios
  socket.on('enviarMsgServidor', function(data) {
    //envia a mensagem para o proprio usuario q envio a mensagem
    socket.emit('msgParaCliente', {apelido: data.apelido, mensagem: data.mensagem});
    //o broadcast envia a mensagem para todos conectados no mesmo Socket ( todos os usurairos receberam a msg)
    socket.broadcast.emit('msgParaCliente', {apelido: data.apelido, mensagem: data.mensagem});

    //confere se o usuario já foi atualizado e posto na lista de usuarios dentro do chat
    if(parseInt(data.usuario_atualizado) == 0) {
      socket.emit('participantesParaCliente', {apelido: data.apelido});
      socket.broadcast.emit('participantesParaCliente', {apelido: data.apelido});
    }

  });

});
