const express = require('express');
const router = express.Router();

const knex = require('../db/knex');


router.get('/', (req, res) => {
    knex('partida')
      .select()
      .then(partidas => {
        res.render('partidas/partidas', { partidas: partidas });
      });
  });



  module.exports = router;
