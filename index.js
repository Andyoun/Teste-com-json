const express = require('express');
const expressMongoDb = require('express-mongo-db');
const bodyParser = require('body-parser');
const ObjectID = require('mongodb').ObjectID;

const app = express();

// app.use(expressMongoDb('mongodb://localhost/vamoslar'));
app.use(expressMongoDb('mongodb://vamoslar:vamoslar123@165.227.221.155/vamoslar'));

app.use(bodyParser.json());

// busca todos os usuario
app.get('/usuarios', (req, res) => {
    req.db.collection('usuarios').find().toArray((err, data) => {
        if (err) {
            res.status(500).send('Mano deu erro!');
            return;
        }

        res.send(data);
    });
});

// cadastrar usuario
app.post('/cadastro', (req, res) => {
    let dados = {
        nome: req.body.nome,
        idade: req.body.idade,
        email: req.body.email,
        cidade: req.body.cidade,
        busca: req.body.busca,
        cpf: req.body.cpf

    }
    req.db.collection('usuarios').insert(dados, (err) => {
        if (err) {
            res.status(500).send('Um minuto estamos trabalhando para melhorar o nosso serviço!');
            return;
        }

        res.send(req.body);
    });
});

app.post('/residencias', (req, res) => {
    if (req.body.tipo != "apartamento" && req.body.tipo != "casa" && req.body.tipo != "flat") {
        res.send(400).send({ mensagem: "Tipo invalido" });
        return;
    }




    req.db.collection('residencias').insert(dados, (err) => {
        if (err) {
            res.status(500).send('Um minuto estamos trabalhando para melhorar o nosso serviço!');
            return;
        }

        res.send(req.body);
    });
});

app.listen(process.env.PORT || 3000, () => console.log("Aplicação iniciada"));