var topGame= document.getElementById("idTopGame");
var avatar =JSON.parse(localStorage.getItem("sesion"));
//cadVariables=JSON.parse(localStorage.getItem("sesion"));
var puntosTotal=avatar.puntos;
// Obtiene la cantidad de filas por nivel
function getRowCount(level) {
  return 2;
}

// Obtiene la cantidad de columnas por nivel
function getColCount(level) {
  switch (level) {
    case 1:
      return 2;
    case 2:
      return 3;
    case 3:
      return 4;
      case 4:
      return 5;
    default:
      return 2;
  }
}

// /Codigo del tiempo
// function myTimer() {

//     document.getElementById("tiempo").innerHTML = time;
//     time++;
// }

// var time=0;
//  var myVar = setInterval(myTimer, 1000);
var contCartasGiradas=0;
class Juego {
  constructor(images, user) {
    this.tablero = [];
    this.selectedCards = [];
    this.numeroCartas=0;
    this.shownCount = 0;

    this.puntos = 0;
    this.level = 1;

    this.root = null;
    this.cardsImages = images;
    this.user = user;
    this.id=0;


    this.guardarPartida()

  }

  resetJuego() {
    this.tablero = this.genTablero(1);
    this.puntos = 0;
  }

  getRand(max, min) {
    return Math.floor(Math.random() * (max - min));
  }

  // Punto inicial de la carga del juego, el selector dado es seleccionado como raíz y el juego es renderizado dentro del mismo
  mount(selector) {
    this.root = $(selector);
    this.bootstrap();
  }




  // Elementos de bootstrap son cargadas y el tablero es generado(PINTADO), segunda parte de la carga del juego.
  bootstrap() {
    //const userImage = this.user + "_image";

  // var time=0;
  // var myVar = setInterval(myTimer, 1000);

    const userImage = this.user
    const scoreBoard = $(
      '<div class="row"><div class="col "> <h2>Puntos: <span  id="score"></span></h2></div></div>'
    );


    /*&&&&&****PRUEBA******&&&&*/
    const scoreBoardDOS = $(
      '<div class="row"><div class="col"><img id="avatar" src="' +
        userImage +
        '" /><h2>Puntos: <span id="score"></span></h2></div></div>'
    );
    //topGame.append(scoreBoardDOS);
    /******%%%% fin prueba%%%%%%*/


    this.root.append(scoreBoard);
    const tablero = $('<div id="tablero"></div>');
    this.root.append(tablero);
    this.genTablero(this.level);
    this.serveCards();
    this.updateScore();
  }

  colocarAvatar(nombre){
    let img = document.getElementById("avatar");
    //var nombre="avatar1.png";
    img.innerHTML="<img class='img-responsive' src="+nombre.nombre+">";
  }


  // Genera html para visualizar las cartas del tablero y la inserta en el div con #tablero
  serveCards() {
    console.log(this.tablero);
    const rows = getRowCount(this.level);
    const cols = getColCount(this.level);
    const cardsContainer = this.root.children("#tablero");
    for (let r = 0; r < rows; r++) {
      const row = $('<div class="card-deck img-thumbnail"></div>');
      for (let c = 0; c < cols; c++) {
        const card = this.tablero[r * cols + c];
        row.append(card.domNode);
      }
      cardsContainer.append(row);
    }
  
  }

guardarPartida(){
  var req = new XMLHttpRequest();
  // Petición HTTP GET síncrona hacia el archivo fotos.json del servidor
    const server=window.location.origin;//atrapa ruta del servidor
   req.open("POST", server+"/front/guardarPartida",false);
   req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
   let idu=avatar.id;
   let puntos=this.puntos;
   req.send("puntos="+puntos+"&id="+idu);
   let id = JSON.parse(req.responseText);
   this.id=parseInt(id,10);
   console.log(id);
}


//guardar partida anterior
// guardarPartida(){
//   var req = new XMLHttpRequest();
//   // Petición HTTP GET síncrona hacia el archivo fotos.json del servidor
//     const server=window.location.origin;//atrapa ruta del servidor
//    req.open("POST", server+"/front/guardarPartida"+avatar.id+this.puntos ,false);
//    req.send(null);
//    let id=JSON.parse(req.responseText);
//    this.id=parseInt(id,10);
//    console.log(id)
// }
 


actualizarPartida(){
   var req = new XMLHttpRequest();
   // Petición HTTP GET síncrona hacia el archivo fotos.json del servidor
   const server=window.location.origin;
   let id =this.id;
   let puntaje=this.puntos;
   req.open("POST", server+"/front/updatePartida", false);
   req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
   req.send("puntos="+puntaje+"&id="+id);
 }



  // // // Actualiza el score en pantalla
  // updateScore() {
  //   console.log("puntos", this.puntos);
  //   this.saveScore(); // Guarda el score

  //   var req = new XMLHttpRequest();
  //   // Petición HTTP GET síncrona hacia el archivo fotos.json del servidor
  //   const server=window.location.origin;//atrapa ruta del servidor
  //   req.open("GET", server+"/front/updateScore"+avatar.id+avatar.puntaje ,false);

  //   req.send(null);

  //   this.root.find("#score").text(this.puntos);
  // }



  updateScore() {
    console.log("puntos", this.puntos);
    this.saveScore(); // Guarda el score

    var req = new XMLHttpRequest();
    // Petición HTTP GET síncrona hacia el archivo fotos.json del servidor
    const server=window.location.origin;//atrapa ruta del servidor
    req.open("POST", server+"/front/updateScore" ,false);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send("puntos="+avatar.puntaje+"&id="+avatar.id);

    this.root.find("#score").text(this.puntos);
  }




  // Verifica si hay un match entre las cartas seleccionadas, almacenadas en selectedcards
  makeMatch() {
    if (juego.selectedCards.length < 2) {
      return;
    }

    const cardA = juego.selectedCards.pop();
    const cardB = juego.selectedCards.pop();

if (cardA.image === cardB.image) {
var audiocorrecto = document.getElementById("correcto");
audiocorrecto.preload="auto"
audiocorrecto.play();

      juego.puntos+=cardA.puntaje;
      avatar.puntaje+= cardA.puntaje;
      contCartasGiradas++;
      juego.updateScore();
      juego.actualizarPartida();

      juego.checkNextLevel();
    } else {

      var audiomal=document.getElementById("mal");
      audiomal.preload="auto"
      audiomal.play();

      cardA.hide();
      cardB.hide();
    }

  }

  // Verifica si la puntuación es la suficiente para avanzar de nivel
  checkNextLevel() {
    if (this.numeroCartas === contCartasGiradas  ) {
      contCartasGiradas=0;
      this.gotoNextLevel();
    
    //  this.actualizarPartida();
    }
  }

  // Avanza a pantalla de resultados
  gotoNextScreen() {

 
    
    window.location.href = "/front/felicidades";
  }

  //Guarda la puntuacion en el localstorage
  saveScore() {
    localStorage.setItem(this.user + "_score", this.puntos);
  }

  // Avanza al siguiente nivel, limpiando el tablero y generando otro con el nuevo nivel
  gotoNextLevel() {
    this.level += 1;
    if (this.level > 3) {
     // if (this.level > 4) {
      // Fin del juego
      this.saveScore();
      this.gotoNextScreen();
   avatar.puntos+=puntosTotal;
   let arrayAvatares= JSON.parse(localStorage.getItem("personajes"));
   for (var variable in arrayAvatares) {
     if (arrayAvatares[variable].id==avatar.id) {
        arrayAvatares[variable].puntos=avatar.puntos;

        localStorage.setItem("personajes", JSON.stringify(arrayAvatares));
     }
   }
    }
    this.clearBoard();
    this.genTablero(this.level);
    this.serveCards();
    this.updateScore();
  }

  // Limpia el tablero, cartas seleccionadas y el html de #tablero
  clearBoard() {
    this.tablero = [];
    this.selectedCards = [];
    this.shownCount = 0;
    this.root.children("#tablero").empty();
  }

  getRand(max, min) {
    return Math.floor(Math.random() * (max - min));
  }

  genTablero(level) {
    let maxCards = 0;
    let table = [];
    switch (level) {
      case 1:
        maxCards = 4;

        break;
      case 2:
        maxCards = 6;
        break;
      case 3:
        maxCards = 8;
        break;
      default:
        maxCards = 0;
        break;
    }
    const levelCards = this.genLevelCards(level);
    console.log("CARTAS DEL NIVEL");
    console.log(levelCards);
    const levelCardsCount = Array.apply(null, levelCards).map(
      Number.prototype.valueOf,
      0
    ); // https://stackoverflow.com/questions/1295584/most-efficient-way-to-create-a-zero-filled-javascript-array
    console.log(levelCards, levelCardsCount);
    for (let i = 0; i < maxCards; i++) {
      let rndIndex = -1;
      while (rndIndex === -1 || levelCardsCount[rndIndex] === 2) {
        rndIndex = this.getRand(levelCards.length, 0);
      }
      console.log("JUSTO AQUI");
      console.log(rndIndex);
      levelCardsCount[rndIndex] += 1;
      //const c = new Card(i, this.cardsImages.imagenes[rndIndex]);
      const c = new Card(i, levelCards[rndIndex]);
      c.setClicker(this.flipCard);
      table.push(c);
    }
    this.tablero = table;
  }

  // Le da vuelta a una carta, es llamado cuando le das click a una carta
  flipCard(e) {
    const card = e.data;
    if (card.isShown()) {
      console.log("already Shown");
      return;
    }
    juego.selectedCards.push(card);
    card.show();
    setTimeout(juego.makeMatch, 400);
  }

  genLevelCards(level) {
    let maxCards = 0;
    switch (level) {
      case 1:
        maxCards = 2;
        break;
      case 2:
        maxCards = 3;
        break;
      case 3:
        maxCards = 4;
        break;
      default:
        break;
    }
    this.numeroCartas=maxCards;
    var index_azar = new Array();
    var cartas_nivel = new Array();
    for (let index = 0; index < maxCards; index++) {
      var img_azar = Math.floor(Math.random() * this.cardsImages.imagenes.length);
      console.log("RANDOM: "+ img_azar)
      let repetida = false;
      if (index_azar.length > 0){        
        index_azar.forEach(element => {          
          if (element == img_azar){            
            repetida = true;  
            console.log("azar: "+ img_azar + " Element:" + element);          
          }
        });
      } else {
        index_azar[0] = img_azar;
        cartas_nivel[0] = this.cardsImages.imagenes[img_azar];        
      }
      if (repetida) {
        index --;
        console.log("repetida")
      } else {
        index_azar[index] = img_azar;
        cartas_nivel[index] = this.cardsImages.imagenes[img_azar];
        console.log("Total elementos: "+ index_azar.length);
      }      
    }
    //return this.cardsImages.imagenes.slice(0, maxCards);
    return cartas_nivel;
  }
}
