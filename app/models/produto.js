/**
 * Arquivo: poduto.js
 * Author: Weslley Fratini
 * Descrição: Arquivo responsável onde trataremos o modelo da classe "Produto"
 * Data: 18/10/2017
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/**
 * Produto:
 *
 * Id: int
 * Nome: String
 * Preço: Number
 * Descrição: String
 */

var ProdutoSchema = new Schema({
  nome: String,
  preco: Number,
  descricao: String,
});

module.exports = mongoose.model("Produto", ProdutoSchema);
