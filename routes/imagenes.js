const express = require('express');
const router = express.Router();

const knex = require('../db/knex');

var scripts = [{ script: '/js/image.js' }];


router.get('/', (req, res) => {
    knex('imagenjuego')
      .select()
      .then(imagenes => {
        res.render('imagenes/imagenes', { imagenes: imagenes });
      });
  });



//localhost:3000/usuarios/agregar
router.get('/agregar', (req, res) => {
    res.render('imagenes/agregar', {scripts: scripts});
  });



  // ver imagenes
router.get('/:id', (req, res) => {

    const id = req.params.id;
    console.log(id)
    respondAndRenderTodo(id, res, 'imagenes/ver');
  });




  router.get('/:id/edit', (req, res) => {
    const id = req.params.id;
    respondAndRenderTodo(id, res, 'imagenes/editar');
  });

  //localhost:3000/usuarios/
  router.post('/', (req, res) => {
    validateTodoRenderError(req, res, (imagenes) => {

      knex('imagenjuego')
        .insert(imagenes, 'id')
        .then(ids => {
          const id = ids[0];
          res.redirect(`/imagenes/${id}`);
        });
    });
  });

  router.put('/:id', (req, res) => {
    validateTodoRenderError(req, res, (imagenes) => {
      const id = req.params.id;
      knex('imagenjuego')
        .where('id', id)
        .update(imagenes, 'id')
        .then(() => {
          res.redirect(`/imagenes/${id}`);
        });
    });
  });

  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    if(validId(id)) {
      knex('imagenjuego')
        .where('id', id)
        .del()
        .then(() => {
          res.redirect('/imagenes');
        });
    } else {
      res.status( 500);
      res.render('error', {
        message:  'Invalid id'
      });
    }
  });

  function validateTodoRenderError(req, res, callback) {
    //if(validTodo(req.body)) {

      const imagen = {
        nombre: req.body.input_nombre,
        puntaje: req.body.puntaje
      };

      console.log(imagen);

      callback(imagen);
    /*} else {
      res.status( 500);
      res.render('error', {
        message:  'Invalid todo'
      });
    }*/
  }

  function respondAndRenderTodo(id, res, viewName) {
    if(validId(id)) {
      knex('imagenjuego')
        .select()
        .where('id', id)
        .first()
        .then(imagenes => {
          console.log(imagenes)
          res.render(viewName,{imagenes: imagenes, scripts: scripts} );
        });
    } else {
      res.status( 500);
      res.render('error', {
        message:  'Invalid id'
      });
    }
  }

  function validId(id) {
    return !isNaN(id);
  }

  module.exports = router;
