// importar as config do server
var app = require('./config/server');

// parametrizar a posta d escuta da porta 80 padrao
app.listen(8080, function() {
  console.log("servidor online!");
});
