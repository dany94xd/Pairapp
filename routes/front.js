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



router.get('/instrucciones',(req, res) => {
    //Pantalla para mostrar todos los usuario con rol 'N' (niño)
   
        res.render('front/instrucciones');

});


router.get('/consultUserId:id', (req, res) => {
    const id= req.params.id;
    console.log("consultando..."+id);
      knex('usuario')
      .where('id', id)
      .first()
      .then((usuarios) => {
        if(usuarios!=undefined) {
          //res.redirect(/usuarios);
          res.json({usuarios:usuarios});
          console.log(res);
          //res.render(login/sesion, {user:user})
        }
        else{
            console.log("vales verga vinces")
        }
    });
    
});

router.get('/jugar:nivel', (req, res) => {
    console.log(req.params.nivel);
            res.render('front/juego', {nivel: req.params.nivel});
        });




module.exports = router;
