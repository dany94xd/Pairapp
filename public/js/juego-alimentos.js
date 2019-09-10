$(document).ready(function() {
 
    var ruta="../"
    var imagenes=[]
    var tagImagenes=[]
    var verifadorLeche = true;  
    var verifadorYogurt = true;
    var verifadorPlatano = true;
    var verifadorPan = true;
    var verifadorZanahoria = true;
    var verifadorTomate = true;
    var verifadorNranja = true;
    
    
 data=JSON.parse(localStorage.getItem("alimentos"));
    console.log(data)
      $.each(data, function(key, val){
        var img= document.createElement("img")
    
       img.src=val.rutaImg;
       img.className= 'alimentos'
       img.id=val.id
       puntos=parseInt(val.puntos, 10);
        let newElement ={
          id:val.id,
          puntos:puntos,
          rutaImg:val.rutaImg,
          name:val.name,
          sonido:val.sonido,
          nutricion:val.nutricion
        }
    
        imagenes.push(newElement)
        tagImagenes.push(img)
        console.log(tagImagenes)
      });
    
    
      ///funcion clasificacion
      console.log(tagImagenes.length) //html
      for (let i=0;i<tagImagenes.length;i++){
        if(imagenes[i].nutricion=="reguladores"){
          console.log("reg")
        tagImagenes[i].className+=' reguladores'
          $("#reguladores").append(tagImagenes[i])
        }else if(imagenes[i].nutricion=="dañinos"){
          console.log("da")
          tagImagenes[i].className+=' dañinos'
          $("#dañinos").append(tagImagenes[i])
        }else if(imagenes[i].nutricion=="energeticos"){
          console.log("en")
          tagImagenes[i].className+=' energeticos'
          $("#energeticos").append(tagImagenes[i])
        }else if(imagenes[i].nutricion=="contructores"){
          console.log("con")
          tagImagenes[i].className+=' contructores'
    
          $("#contructores").append(tagImagenes[i])
        }
        console.log("imganes")
        console.log(tagImagenes[i])
       
      }
      /*for (let i=0;i<imagenes.length;i++){
        if (imagenes[i].nutricion=="dañinos") {
          $('.dañinos').removeClass('alimentos').addClass('ADañados');
      
        }
      }*/
      
    var puntajeJuego = 0 ; 
    var contadorLonchera=0
    var audioElement = document.createElement('audio');
    
    var audiohamburguesa = document.createElement('audio');
    audiohamburguesa.setAttribute('src', '/audio/hamburguesa.mp3');        
    
    var audioPizza = document.createElement('audio');
    audioPizza.setAttribute('src', '/audio/pizza.mp3');    
    
    var audioCocacola = document.createElement('audio');
    audioCocacola.setAttribute('src', '/audio/cocacola.mp3'); 
    
    var audioLeche = document.createElement('audio');
    audioLeche.setAttribute('src', '/audio/leche.mp3');
    
    var audioYogurt = document.createElement('audio');
    audioYogurt.setAttribute('src', '/audio/yogurt.mp3');
    
    var audioPlatano = document.createElement('audio');
    audioPlatano.setAttribute('src', '/audio/platano.mp3');
    
    var audioPanIntegral = document.createElement('audio');
    audioPanIntegral.setAttribute('src', '/audio/panIntegral.mp3');
    
    var audioZanahoria = document.createElement('audio');
    audioZanahoria.setAttribute('src', '/audio/zanahoria.mp3');
    
    var audioTomate = document.createElement('audio');
    audioTomate.setAttribute('src', '/audio/tomate.mp3');
    
    var audioNnaranja = document.createElement('audio');
    audioNnaranja.setAttribute('src', '/audio/naranja.mp3');
    
    
    var bienHecho = document.createElement('audio');
    bienHecho.setAttribute('src', '/audio/bienhecho.mp3');
    
    var malo = document.createElement('audio');
    malo.setAttribute('src', '/audio/malo.mp3');
    
    var hazArmado = document.createElement('audio');
    hazArmado.setAttribute('src', '/audio/hazarmado.mp3');
    
    var ganaste = document.createElement('audio');
    ganaste.setAttribute('src', '/audio/ganaste.mp3');
    /*
    $("a.external").click(function() { url = $(this).attr("href"); window.open(url, '_blank'); return false; });*/
    $(".alimentos").draggable({ 
    
     helper:"clone",
      drag: function(event, ui)
        { 
          console.log($ (this).attr('id'))
           imagenes.forEach(element=>{    
               
            if($(this).attr('id')==element.id){

               
              if(element.sonido == "sonidoHambur"){  
                audiohamburguesa.play();
                return
              }
              if(element.sonido == "sonidoPizza") {          
                audioPizza.play();
              }
              if(element.sonido== "sonidoCola") {
                audioCocacola.play();
                return
              }
           
            if(element.sonido== "sonidoLeche") {
               
            //   $('#contructores').find( this).each(function() {    
              
                if (verifadorLeche == true) {
                  
                  puntajeJuego += element.puntos;
                  sumarPuntosAvatar();
                  $(".puntaje").text(puntajeJuego.toString())
                  contadorLonchera--
                  verifadorLeche = false;
                }              
            //   });
              audioLeche.play();
              return
            }
            if(element.sonido == "sonidoYogurt") {
              $('#contructores').find( this).each(function() {
            
                if (verifadorYogurt == false) {
                  puntajeJuego -= element.puntos;
                  $(".puntaje").text(puntajeJuego.toString())
                  contadorLonchera--
                  verifadorYogurt = true;
                }              
              });
              audioYogurt.play();
              return
            }
            if(element.sonido == "sonidoPlatano") {
              $('#energeticos').find( this).each(function() {
            
                if (verifadorPlatano == false) {
                  puntajeJuego -= element.puntos;
                  $(".puntaje").text(puntajeJuego.toString())
                  contadorLonchera--
                  verifadorPlatano = true;
                }              
              });
              audioPlatano.play();
              return
            }
            if(element.sonido == "sonidoPan") {
              $('#energeticos').find( this).each(function() {     
                if (verifadorPan == false) {
                  puntajeJuego -= element.puntos;
                  $(".puntaje").text(puntajeJuego.toString())
                  contadorLonchera--
                  verifadorPan = true;
                }              
              });
              audioPanIntegral.play();
              return
            }
            if(element.sonido == "sonidoZanahoria") {
              $('#reguladores').find( this).each(function() {      
                if (verifadorZanahoria == false) {
                  puntajeJuego -= element.puntos;
                  $(".puntaje").text(puntajeJuego.toString())
                  contadorLonchera--
                  verifadorZanahoria = true;        
                }              
              });
              audioZanahoria.play();
              return
            }
            if(element.sonido == "sonidoTomate") {
              $('#reguladores').find( this).each(function() {     
                if (verifadorTomate == false) {
                  puntajeJuego -= element.puntos;
                  $(".puntaje").text(puntajeJuego.toString())
                  contadorLonchera--
                  verifadorTomate = true;            
                }              
              });
              audioTomate.play();
              return
            }
            if(element.sonido == "sonidoNaranaja") {
              $('#reguladores').find( this).each(function() {      
                if (verifadorNranja == false) {
                  puntajeJuego -= element.puntos;
                  $(".puntaje").text(puntajeJuego.toString())
                  contadorLonchera--
                  verifadorNranja = true;  
                  console.log(contNranja + "dddddddd")
                }              
              });
              audioNnaranja.play();
              return
            }
          }
           })
        }
    });
      
    function  sumarPuntosAvatar(){
        var req = new XMLHttpRequest();
// Petición HTTP GET síncrona hacia el archivo fotos.json del servidor
         const server=window.location.origin;//atrapa ruta del servidor
        req.open("POST", server+"/imagenes/actualizapuntos", false);
        req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
       let idu=JSON.parse(localStorage.getItem("sesion"))
      idu=idu.id
       let puntos=puntajeJuego
       let usuarioTmp={
           id:idu,
           puntos:puntos
       }
       console.log(usuarioTmp)
       usuarioTmp=JSON.stringify(usuarioTmp)
       console.log(idu.id)
        req.send("usuario="+usuarioTmp);
        let id =req.responseText;
        this.id=parseInt(id,10);
        console.log(id);
    }
    $(".lonchCont").droppable({
      accept: ".alimentos",
      /*accept:  function( draggable ){   if (!$(this).hasClass('alimentos') || draggable.hasClass('ADañados')){   return true;}
        return false;
      },*/
    
    
      hoverClass: 'hovering',
        drop: function( ev, ui ) {
        
          imagenes.forEach(element=> {
            if($(ui.draggable).attr('id')==element.id){
            console.log(element.puntos)
            console.log(puntajeJuego)
            ui.draggable.detach();   
            let contene=element.id;
             // console.log($ (ui.draggable).attr("class"))
             console.log("contadorLonchera")
              console.log(contadorLonchera)
              console.log(contene + "ssss")
              if(contadorLonchera<4){
                
              if ($ (ui.draggable).hasClass( "dañinos") ) {
                $("#dañinos").append(ui.draggable)          
               malo.play();
                return 
              }
              if ($ (ui.draggable).hasClass("contructores")) {
                $( ".cont1" ).append( ui.draggable  );
    
                if (verifadorLeche == true && contene == 4) {
                  puntajeJuego += element.puntos;
                  $(".puntaje").text(puntajeJuego.toString())
                  contadorLonchera++
                  verifadorLeche = false;
                }
                if (verifadorYogurt == true && contene == 5) {
                  puntajeJuego += element.puntos;
                  $(".puntaje").text(puntajeJuego.toString())
                  contadorLonchera++
                  verifadorYogurt = false;
                }         
                return
              }
              if ($ (ui.draggable).hasClass("energeticos")) {
                $( ".cont2" ).append( ui.draggable );
                if (verifadorPlatano == true && contene == 6) {
                  puntajeJuego += element.puntos;
                  $(".puntaje").text(puntajeJuego.toString())
                  contadorLonchera++
                  verifadorPlatano = false;
                }
                if (verifadorPan == true && contene == 7) {
                  puntajeJuego += element.puntos;
                  $(".puntaje").text(puntajeJuego.toString())
                  contadorLonchera++
                  verifadorPan = false;
                }
                return
              }
    
              if ($ (ui.draggable).hasClass("reguladores")) {
                $( ".cont3" ).append( ui.draggable /*, audioElement.play()*/ ); 
               
                if (verifadorZanahoria == true && contene == 8) {
                  puntajeJuego += element.puntos;
                  $(".puntaje").text(puntajeJuego.toString())
                  contadorLonchera++  
                  verifadorZanahoria = false;
                }
                if (verifadorTomate == true && contene == 9) {
                  puntajeJuego += element.puntos;
                  $(".puntaje").text(puntajeJuego.toString())
                  contadorLonchera++
                  verifadorTomate = false;
                } 
                if (verifadorNranja == true && contene == 10) {
                  puntajeJuego += element.puntos;
                  $(".puntaje").text(puntajeJuego.toString())
                  contadorLonchera++
                  verifadorNranja = false;             
                }                
                bienHecho.play();
                return
            }
            
              }else{
                let contenedor=element.nutricion;
                console.log(contenedor)
                $("#"+contenedor).append( ui.draggable )
                // window.alert("lonchera llena tu puntaje es " +puntajeJuego );
                $(".puntaje2").text(puntajeJuego.toString())
            /* se cear el json  */
                createJSON();
                function createJSON() {            
                  var textRegu =  "";
                  var textConst=  "";
                  var textEnerg =  "";
                  textRegu =  "";
                  textConst=  "";
                  textEnerg =  "";
                  console.log(textEnerg)
                  $('#lonchRegu').find( '.reguladores').each(function() {   
                    imagenes.forEach(element=> {
                       if(element.id == this.id ){
                        textRegu += element.name +" "
                       }
                    })                            
                  });
                      var res = textRegu.slice(0, -1);
                     let valores=res.split(" ");
    
                     $('#lonchContru').find( '.contructores').each(function() {   
                      imagenes.forEach(element=> {
                         if(element.id == this.id ){
                          textConst += element.name +" "
                         }
                      })                            
                    });
                        var res2 = textConst.slice(0, -1);
                       let valores2=res2.split(" ");
    
                       $('#lonchEnerg').find( '.energeticos').each(function() {   
                        imagenes.forEach(element=> {
                           if(element.id == this.id ){
                            textEnerg += element.name +" "
                           }
                        })                            
                      });
                          var res3 = textEnerg.slice(0, -1);
                         let valores3=res3.split(" ");
    
                 var descarga = JSON.stringify({ puntaje : puntajeJuego , 
                    alimentos : [{constuctor :[ valores2 ], energeticos: [ valores3 ], reguladores :[ valores ] }] });
                $('#descarga').show("slow").click(function(e) {         
                  let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(descarga);        
                  let exportFileDefaultName = '../objetos.json';        
                  let linkElement = document.createElement('a');
                  linkElement.setAttribute('href', dataUri);
                  linkElement.setAttribute('download', exportFileDefaultName);
                linkElement.click(); 
                })               
              }
              /* termina el codigo del json  */ 
                 window.location.href = "ganador.html";
                  hazArmado.play();
                  $(".puntaje2").text(puntajeJuego.toString())         
              }  
          }
          })
         $(".puntaje").text(puntajeJuego.toString())
        },
        /*
        out: function( event, ui ) {
          imagenes.forEach(element=> {
            if($(ui.draggable).attr('id')==element.id){
    
         if ($ (ui.draggable).hasClass("reguladores")) {
            $("#reguladores").append(ui.draggable)
            return
        }
        if ($ (ui.draggable).hasClass("contructores")) {
          $("#contructores").append(ui.draggable)
          return
        }
        if ($ (ui.draggable).hasClass("energeticos")) {
          $("#energeticos").append(ui.draggable)
          return
        }
            }
          })
        }  */
    });
    
    $("#contructores").droppable({
      accept: ".contructores",
     
      hoverClass: 'hovering',
        drop: function( ev, ui ) {
          imagenes.forEach(element=>{    
            if($(ui.draggable).attr('id')==element.id){
              let contene=element.id;
              $( "#contructores" ).append( ui.draggable  );
              $('#descarga').hide( "slow");
              if (verifadorLeche == false  && contene == 4) {
                puntajeJuego -= element.puntos;
                $(".puntaje").text(puntajeJuego.toString())
                contadorLonchera--
                verifadorLeche = true;        
              }  
              if (verifadorYogurt == false  && contene == 5) {
                puntajeJuego -= element.puntos;
                $(".puntaje").text(puntajeJuego.toString())
                contadorLonchera--
                verifadorYogurt = true;            
              }   
            }});     
          return
        }})
    $("#energeticos").droppable({
      accept: ".energeticos",
     
      hoverClass: 'hovering',
        drop: function( ev, ui ) {
          imagenes.forEach(element=>{    
            if($(ui.draggable).attr('id')==element.id){
              let contene=element.id;
              $( "#energeticos" ).append( ui.draggable  );   
              $('#descarga').hide( "slow");    
              if (verifadorPlatano == false  && contene == 6) {
                puntajeJuego -= element.puntos;
                $(".puntaje").text(puntajeJuego.toString())
                contadorLonchera--
                verifadorPlatano = true;        
              }  
              if (verifadorPan == false  && contene == 7) {
                puntajeJuego -= element.puntos;
                $(".puntaje").text(puntajeJuego.toString())
                contadorLonchera--
                verifadorPan = true;            
              }   
            }});     
          return
        }
    })
    $("#reguladores").droppable({
      accept: ".reguladores", 
      hoverClass: 'hovering',
        drop: function( ev, ui ) {
        imagenes.forEach(element=>{    
          if($(ui.draggable).attr('id')==element.id){
            let contene=element.id;
            $( "#reguladores" ).append( ui.draggable  );
            $('#descarga').hide( "slow");
            if (verifadorZanahoria == false  && contene == 8) {
              puntajeJuego -= element.puntos;
              $(".puntaje").text(puntajeJuego.toString())
              contadorLonchera--
              verifadorZanahoria = true;        
            }  
            if (verifadorTomate == false  && contene == 9) {
              puntajeJuego -= element.puntos;
              $(".puntaje").text(puntajeJuego.toString())
              contadorLonchera--
              verifadorTomate = true;            
            }  
            if (verifadorNranja == false  && contene == 10 ) {
              puntajeJuego -= element.puntos;
              $(".puntaje").text(puntajeJuego.toString())
              contadorLonchera--
              verifadorNranja = true;  
           
            }  
    
          }});
        
        return
        }
    })
    });
