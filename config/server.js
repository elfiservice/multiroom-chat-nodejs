/**
*** IMPORTANDO MODULOS
**/
// importar modulo do framework express
var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

/**
*** INICIAR OBJETO EXPRESS
**/
var app = express();

/**
*** INFORMANDO QUE TIPO DE VIEWS (HTML) SERAM PROCESSADAS
**/
//informar q sera usado no processamento o ejs e onde elas são encontradas
app.set('view engine', 'ejs');
app.set('views', './app/views');

/**
*** CONFIG OS MIDDLEWARE
**/
//informar onde se encontra os conteudos estaticos do frontEnd
app.use(express.static('./app/public'));
//ativa a recuperacao do conteudo passado do HTML via post como Json
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());

/**
*** AUTO LOAD DOS ARQUIVOS DO APP
**/
// efetua o auto load das rotas, models, e controllers para o objt app
consign()
  .include('app/routes')
  .then('app/models')
  .then('app/controllers')
  .into(app);

/**
*** EXPORTAR O OBJETO app
**/
module.exports = app;
