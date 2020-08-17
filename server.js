/**
 * Arquivo server.js
 * Descrição: 
 * Author: Weslley Fratini
 * Data cariação: 17/08/2020
 * 
 */

 // Configurar o Setup da aplicação:

 //Chamada dos pacotes:
 var express = require('express');
 var app = express();
 var bodyParser = require('body-parser');
 var mongoose = require('mongoose');
 var Produto = require('./app/models/produto');

 //Conexão mongo

 mongoose.connect('mongodb://dbWeslley:weslley123@cluster0.w1tfi.azure.mongodb.net/dbWeslley?retryWrites=true&w=majority'
    {
      useMongoClient:true
    });
 //mongoose.connect('mongodb://localhost/crud-teste'
 //  {
 //  useMongoClient:true
 //  });

 //Configuração da variável app para usar o 'bodyParser():
 app.use(bodyParser.urlencoded({ extended: true}));
 app.use(bodyParser.json);


 //Definindo a porta que API será executada:
 var port = process.env.port || 8000;

 //Rotas da nossa API:
 //==============================================


 //Criando uma instancia das rotas via Express:
 var router = express.Router();

 router.use(function(req, res, next){
    console.log('Algo esta acontecendo aqui...')
    next();
});

//API's:
//=====================================================

//Rotas que terminarem com '/produtos' (servir para GET ALL & POST)
router.route('./produtos')

/* 1 - Método : Criar produto (acessar em POST http:localhost:8000/api/produtos)*/
.post( function (req, res){
    var produto = new Produto();

    //Setar campos produtos - REQUEST
    produto.nome = req.body.nome;
    produto.preco = req.body.preco;
    produto.descricao = req.body.descricao;

    produto.save(function(error){
        if(error)
            res.send('Erro ao tentar salvar o produto.....: ' + error);

        res.json({ message: 'Produto cadastrado com sucesso" '});
    });
})

/* 2 - Método : Selecionar produto (acessar em GET http:localhost:8000/api/produtos)*/

.get(function(req, res){
    Produto.find(function(error, produtos){
        if(error)
            res.send('Erro ao tentar selecionar todos os produtos...: ' + error);

        res.json(produtos);
    });
});

 //Rota de exemplo:
 router.get('/', function(req, res) {
    res.json({ message: 'Muito bom! Bem vindo a nossa loja'})
 }); 

 //Definindo uma padrão das rotas prefixadas: '/api:
 app.use('/api', router);

//Iniciando o servidor:
 app.listen(port);
 console.log("Iniciando a app na porta: " + port);