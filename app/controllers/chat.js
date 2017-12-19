module.exports.startChat = function(application, req, res) {

    //body vem do modulo body-parser - acesso os dados da view via post no formato Json
    var dadosForm = req.body;

    req.assert('apelido', 'Preencha um apelido.').notEmpty();
    req.assert('apelido', 'O apelido deve ter de 3 a 15 caracters.').len(3, 15);

    var error = req.validationErrors();

    if(error) {
        res.render('index', {validacao: error});
        return;
    }

    //application.get('io') ==> recupera o objeto 'io' no app.js
    application.get('io').emit(
        'msgParaCliente',
        {apelido: dadosForm.apelido, mensagem: ' acabou de se conectar.'}
    );

    //envia os dados do usuario conectado para a view chat para obter o nome do mesmo
    res.render('chat.ejs', {dadosForm: dadosForm});
}
