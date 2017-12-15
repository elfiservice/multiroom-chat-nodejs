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

    res.render('chat.ejs');
}
