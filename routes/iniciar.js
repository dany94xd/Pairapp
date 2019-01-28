var express = require('express');
var router = express.Router();

const knex = require('../db/knex');

router.get('/', function(req, res, next) {
    //Pantalla para mostrar todos los usuario con rol 'N' (niño)
    knex('usuario')
    .where('rol', 'N')
    .then(usuarios => {
        res.render('front/iniciar', { usuarios: usuarios });
    });
});



router.get('/', function(req, res, next) {
    //Pantalla para mostrar todos los usuario con rol 'N' (niño)
    knex('partida')
    .then(partidas => {
        res.render('front/explicacion', { partidas: partidas });
    });
});



module.exports = router;
