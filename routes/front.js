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

router.get('/felicidades', function(req, res, next) {
console.log("felicidades");
    res.render('front/felicidades');
});

//guardando partida
router.post('/guardarPartida', (req, res) => {
    const id= req.body.id;
    const puntos=req.body.puntos;
  console.log(id);
      knex('partida')
      .returning('id')
        .insert({puntaje: puntos, idusuario:id})
        .then(ids => {
          res.json(ids);
        });
  
  });



// //guardando partida anterior
// router.get('/guardarPartida:id:puntos', (req, res) => {
//     const id= req.params.id;
//     const puntos=req.params.puntos;
//   console.log(id);
//       knex('partida')
//       .returning('id')
//         .insert({puntaje: puntos, idusuario:id})
//         .then(ids => {
//           res.json(ids);
//           console.log(idusuario);
  
//         });
  
//   });

//actualizando partida
router.post('/updatePartida',function(req,res){
  const id=req.params.id;
  const puntos=req.params.puntos;
 knex('partida')
 .where('id',req.body.id)
 .update({puntaje:req.body.puntos})
 .then(ids =>{
     res.json("partida editada")
  });

});



router.get('/verRanking', (req, res) => {
    knex('partida')
        .select("partida.id", "partida.puntaje ", "partida.idusuario", "usuario.id as usuario.id_usuario", "usuario.foto",  "usuario.nombre")
        .innerJoin('usuario', function () {
        this
       .on('partida.idusuario', 'usuario.id')
      
    })
       .orderBy('puntaje', 'desc')
        .limit(10)
        .then(partidas =>{
            res.render('front/ranking', {partidas: partidas});
        });

      });



// router.post('/updateScore:id:puntaje', function(req, res, next) {
//     //Pantalla para mostrar todos los usuario con rol 'N' (niño)
// const idAvatar= req.params.id;
// const puntajeavatar= req.params.puntaje;
// knex("usuario")
// .where("id", idAvatar)
// .update({puntaje: puntajeavatar})
// .then(()=>{
//   res.json("usuario actualizado");
//   });

// });



router.post('/updateScore', function(req, res, next) {
    //Pantalla para mostrar todos los usuario con rol 'N' (niño)
const idAvatar= req.body.id;
const puntajeavatar= req.body.puntos;
knex("usuario")
.where("id", idAvatar)
.update({puntaje: puntajeavatar})
.then(()=>{
  res.json("usuario actualizado");
  });

});

router.get('/game', function(req, res, next) {
    //Pantalla para mostrar todos los usuario con rol 'N' (niño)

        res.render('front/juego');
});
router.get('/getimagenes', function(req, res, next) {
    //Pantalla para mostrar todos los usuario con rol 'N' (niño)

    knex('imagenjuego')
      .select()
      .then(imagenes => {
        if(imagenes!=undefined){
            res.json({imagenes: imagenes});
        }
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
          console.log("sesion");
          console.log(usuarios);
          res.json({usuarios:usuarios});
         
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
