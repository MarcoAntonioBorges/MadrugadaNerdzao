// O NODE TRABALHA COM SINGLETON
const joi = require('joi');

const schema = joi.object().keys({
    nome: joi.string().min(1).max(20),
    regiao: joi.string().min(3).max(8)
});


module.exports = schema;