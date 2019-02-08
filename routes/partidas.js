const express = require('express');
const router = express.Router();

const knex = require('../db/knex');


router.get('/', (req, res) => {
    knex('partida')
    .select("partida.id", "partida.puntaje as partida", "partida.idusuario", "usuario.id as usuario.id_usuario", "usuario.foto", "usuario.nombre")
    .innerJoin('usuario', function () {
    this
    .on('partida.idusuario','usuario.id')
      })
      .then(partidas => {
        res.render('partidas/partidas', { partidas: partidas });
      });
  });


//localhost:3000/excursiones/agregar
router.get('/agregar', (req, res) => {
  knex('usuario')
  .whereNotExists(function(){
    this.select('*').from('partida').whereRaw('partida.idusuario = usuario.id');
  })
    .then(usuarios => {
      res.render('partidas/agregar', {usuarios:usuarios });
    });
});

//localhost:3000/excursiones/1
router.get('/:id', (req, res) => {

  const id = req.params.id;
  console.log(id)
  respondAndRenderTodo(id, res, 'partidas/ver');
});

//localhost:3000/excursiones/1/edit
router.get('/:id/edit', (req, res) => {
  const id = req.params.id;
  respondAndRenderTodo(id, res, 'partidas/editar');
});

router.post('/', (req, res) => {
  validateTodoRenderError(req, res, (partidas) => {
    
    //excursion.id_user = parseInt(excursion.id_user);
    knex('partida')
    .returning('id')
      .insert({puntaje:req.body.puntaje, idusuario:req.body.idusuario})
      .then(ids => {
        const id = ids[0];
        res.redirect(`/partidas/${id}`);
      });
  });
});

router.put('/:id', (req, res) => {
  //validateTodoRenderError(req, res, (partidas) => {
  //  const id = req.params.id;
    knex('partida')
      .where('id', req.params.id)
      .update({puntaje: req.body.puntaje})
      .then(() => {
        res.redirect(`/partidas/${req.params.id}`);
      });
  });
//});


router.delete('/:id', (req, res) => {
   const id = req.params.id;
  if(validId(id)) {
     knex('partida')
       .where('id', id)
       .del()
       .then(() => {
         res.redirect('/partidas');
      });
  } else {
    res.status( 500);
    res.render('error', {
      message:  'Invalid id'
    });
  }
});

function validateTodoRenderError(req, res, callback) {

    const partidas = {
      puntaje: req.body.puntaje,
      idusuario: req.body.idusuario
    };
    console.log(partidas);
    callback(partidas);
}

function respondAndRenderTodo(id, res, viewName) {
  if(validId(id)) {
    knex('partida')
    .select()
      .where('id', id)
      .first()
      .then(partidas => {
        res.render(viewName,{partidas: partidas} );
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


