var express = require('express');
const bodyParser = require('body-parser');
const MongoCliente = require('mongodb').MongoClient;
const joi = require('joi');

const casaSchema = require('./schemas/casas.js');

const stringConexao = "mongodb://got-marco:nerdzao123@ds021884.mlab.com:21884/got-handson"; 



// Aplicação devolve personagem do GoT
//Http Cats
async function main() {
    const app = express();

    app.use(bodyParser.json());

    const  cliente = new MongoCliente(stringConexao, {useNewUrlParser: true,});

    await cliente.connect();

    const db = cliente.db('got-handson');
    
    const colecaoCasas = db.collection('casas');

    app.get('/casas', async (req, res) => {
        const casas = await colecaoCasas.find({}).toArray();
        res.send(casas);
    });

    app.post("/casas", async (req, res) => {
        const novaCasa = req.body;

        const resultadoDaValidacao = joi.validate(novaCasa, casaSchema);

        if(resultadoDaValidacao.error != null){
            res.status(400);
            res.send({
                error: resultadoDaValidacao.error.details[0].message
            });
            return;
        }

        const result = await colecaoCasas.insertOne(novaCasa);
        res.status(201).send(result);
    });

    app.listen(3000, () => {
        console.log('Porta aberta: 3000');
    });

}

main();

// Leandro Domingues -> Embaixador MongoDB
// mongodb://got-marco:nerdzao123@ds021884.mlab.com:21884/got-handson
//mongodb://galera:nerdzao123@ds021984.mlab.com:21984/got-nerdzao