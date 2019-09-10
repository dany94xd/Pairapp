const express = require('express');
const router = express.Router();

const knex = require('../db/knex');

var scripts = [{ script: '/js/image.js' }];


router.get('/', (req, res) => {
    knex('aliments')
      .select()
      .then(alimentos => {
        res.render('alimentos/alimentos', { alimentos: alimentos });
      });
  });



//localhost:3000/usuarios/agregar
router.get('/agregar', (req, res) => {
    res.render('alimentos/agregar', {scripts: scripts});
    //res.render('alimentos/agregar');
  });



  // ver imagenes
router.get('/:id', (req, res) => {

    const id = req.params.id;
    console.log(id)
    respondAndRenderTodo(id, res, 'alimentos/ver');
  });




  router.get('/:id/edit', (req, res) => {
    const id = req.params.id;
    respondAndRenderTodo(id, res, 'alimentos/editar');
  });

  //localhost:3000/usuarios/
  router.post('/', (req, res) => {
    validateTodoRenderError(req, res, (alimentos) => {

      knex('aliments')
        .insert(alimentos, 'id')
        .then(ids => {
          const id = ids[0];
          res.redirect(`/alimentos/${id}`);
        });
    });
  });

  router.put('/:id', (req, res) => {
    validateTodoRenderError(req, res, (alimentos) => {
      const id = req.params.id;
      knex('aliments')
        .where('id', id)
        .update(alimentos, 'id')
        .then(() => {
          res.redirect(`/alimentos/${id}`);
        });
    });
  });

  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    if(validId(id)) {
      knex('aliments')
        .where('id', id)
        .del()
        .then(() => {
          res.redirect('/alimentos');
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

      const alimento = {
        nombre: req.body.nombre,
        fotoalimento: req.body.input_fotoalimento,
        fecha: req.body.fecha,
        precio: req.body.precio



      };

      console.log(alimento);

      callback(alimento);
    /*} else {
      res.status( 500);
      res.render('error', {
        message:  'Invalid todo'
      });
    }*/
  }

  function respondAndRenderTodo(id, res, viewName) {
    if(validId(id)) {
      knex('aliments')
        .select()
        .where('id', id)
        .first()
        .then(alimentos => {
          console.log(alimentos)
          res.render(viewName,{alimentos: alimentos, scripts: scripts} );
          //res.render(viewName,{alimentos: alimentos} );
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
