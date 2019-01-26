const express = require('express');
const router = express.Router();

const knex = require('../db/knex');

var scripts = [{ script: '/js/login.js' }];

router.get('/', (req, res) => {
  res.render('login/login', {scripts:scripts});
});

router.post('/', (req, res)=> {

  const usuario = {
    usuario:req.body.usuario,
    clave: req.body.clave,
    rol:'A'
  }

  knex('usuario')
      .where(usuario)
      .first()
      .then((user) => {
        if(user!=undefined) {
          console.log(user)
          //res.redirect(`/usuarios`);
          //res.json({user:user})
          res.render(`login/sesion`, {user:user})
        }else {
          res.redirect(`/login`);
        }
      });

  console.log(usuario);
})
router.get('/:id', (req, res)=>{

  const id = req.params.id;
  knex('usuario')
      .where('id', id)
      .first()
      .then((user) => {
        if(user!=undefined) {
          console.log(user)
          //res.redirect(`/usuarios`);
          res.json({user:user})
          //res.render(`login/sesion`, {user:user})
        }else {
          res.redirect(`/login`);
        }
      });

})
module.exports = router;
