const express = require('express');
const router = express.Router();

const knex = require('../db/knex');

var scripts = [{ script: '/js/image.js' }];

/* This router is mounted at /todo */
//localhost:3000/usuarios/
router.get('/', (req, res) => {
  knex('usuario')
    .select()
    .then(usuarios => {
      res.render('usuarios/usuarios', { usuarios: usuarios });
    });
});

//localhost:3000/usuarios/agregar
router.get('/agregar', (req, res) => {
  res.render('usuarios/agregar', {scripts: scripts});
});

router.get('/:id', (req, res) => {

  const id = req.params.id;
  console.log(id)
  respondAndRenderTodo(id, res, 'usuarios/ver');
});
//localhost:3000/usuarios/1/puntos
router.get('/:id/puntos', (req, res) => {

  const id = req.params.id;
  console.log(id)
  knex('usuario')
  .increment('puntaje', 1)
  .where('id', id).then((user)=>{
    res.json(user)
  });
  //respondAndRenderTodo(id, res, 'usuarios/ver');
});

router.get('/:id/edit', (req, res) => {
  const id = req.params.id;
  respondAndRenderTodo(id, res, 'usuarios/editar');
});

//localhost:3000/usuarios/
router.post('/', (req, res) => {
  validateTodoRenderError(req, res, (usuario) => {
    
    knex('usuario')
      .insert(usuario, 'id')
      .then(ids => {
        const id = ids[0];
        res.redirect(`/usuarios/${id}`);
      });
  });
});

router.put('/:id', (req, res) => {
  validateTodoRenderError(req, res, (usuario) => {
    const id = req.params.id;
    knex('usuario')
      .where('id', id)
      .update(usuario, 'id')
      .then(() => {
        res.redirect(`/usuarios/${id}`);
      });
  });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  if(validId(id)) {
    knex('usuario')
      .where('id', id)
      .del()
      .then(() => {
        res.redirect('/usuarios');
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
    
    const usuario = {
      nombre: req.body.nombre,
      usuario: req.body.usuario,
      clave: req.body.clave,
      foto: req.body.input_foto,
      rol: req.body.rol
    };

    console.log(usuario);

    callback(usuario);
  /*} else {
    res.status( 500);
    res.render('error', {
      message:  'Invalid todo'
    });
  }*/
}

function respondAndRenderTodo(id, res, viewName) {
  if(validId(id)) {
    knex('usuario')
      .select()
      .where('id', id)
      .first()
      .then(usuario => {
        console.log(usuario)
        res.render(viewName,{usuario: usuario, scripts: scripts} );
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
