var path = require('path');
var express = require('express');
var router = express.Router();

const knex = require('../db/knex');
//const fileUpload = require('express-fileupload');

router.get('/juego', function(req, res, next) {
    res.render('juego');
  });


  module.exports = router;
