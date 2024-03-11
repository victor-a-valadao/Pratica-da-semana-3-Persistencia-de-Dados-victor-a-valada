// importando bibliotecas e arquivos
const database = require('./db');
const Fornecedor = require('./models/fornecedor');

// criando servidor
const express = require('express');
const app = express();
const porta = 9443;
const bodyParser = require('body-parser');

// Setar os valores da view e engine

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

// definindo rotas
app.get('/', (req, res) =>{
  res.send('Bem vindo ao cadastro de fornecedores.');
});

app.get('/cadfornecedor', function (req, res) {
  res.render('formFornecedor');
});

app.post('/addfornecedor', function (req, res) {
  Fornecedor.create({
    nome: req.body.nome,
    telefone: req.body.telefone,
    email: req.body.email,
  }).then(function (){
    res.send('Fornecedor cadastrado com sucesso!');
  })
})

app.listen(porta, () => {console.log('Servidor rodando')});



(async() => {

  try{
    const resultado = await database.sync();
    console.log(resultado);
    const fornecedores = await Fornecedor.findAll();
    console.log("Lista de Fornecedores \n", fornecedores);
  } catch(error){
    console.log(error);
  }
})
();