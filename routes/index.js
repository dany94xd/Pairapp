var path = require('path');
var express = require('express');
var router = express.Router();

const knex = require('../db/knex');
const fileUpload = require('express-fileupload');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.json({})
  res.render('index', { title: 'Express' });
});

router.get('/admin', function(req, res, next) {
  res.render('admin');
});
/*
router.get('/upload', (req, res)=>{

  res.sendFile(path.join(__dirname, '../public', 'index.html'));
})

router.post('/upload', (req, res)=> {
  console.log(req.files);
  if (!req.files)
  return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file

  let archivo = req.files.archivo;
  console.log("Archivo:")
  console.log(archivo);
 
  // Use the mv() method to place the file somewhere on your server
  archivo.mv(path.join(__dirname, '../public')+'/images/'+archivo.name, function(err) {
    if (err)
      return res.status(500).send(err);


    knex('capitulo')
    .insert({
      youtube_url: archivo.name,
      portada:archivo.name,
      titulo: "Nuevo",
      id_excursion: 1
    })
    .then( ()=> {
      res.send('File uploaded!');
    } )
    
  });
})*/

module.exports = router;
