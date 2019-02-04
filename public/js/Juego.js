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

class Juego {
  constructor(images, user) {
    this.tablero = [];
    this.selectedCards = [];
    this.numeroCartas=0;
    this.shownCount = 0;
   this.contCartasGiradas=0;
    this.puntos = 0;
    this.level = 1;

    this.root = null;
    this.cardsImages = images;
    this.user = user;
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

  // Actualiza el score en pantalla
  updateScore() {
    console.log("puntos", this.puntos);
    this.saveScore(); // Guarda el score
    avatar.puntos= this.puntos;
    let arrayAvatares= JSON.parse(localStorage.getItem("personajes"));
    for (var variable in arrayAvatares) {
      if (arrayAvatares[variable].id==avatar.id) {
         arrayAvatares[variable].puntos=this.puntos;
         localStorage.setItem("sesion", JSON.stringify(avatar));
         localStorage.setItem("personajes", JSON.stringify(arrayAvatares));
      }
    }
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
      juego.puntos += 30;
      juego.puntos+=card.puntaje;
      this.contCartasGiradas+=2;
      juego.checkNextLevel();
    } else {
      cardA.hide();
      cardB.hide();
    }
    juego.updateScore();
  }

  // Verifica si la puntuación es la suficiente para avanzar de nivel
  checkNextLevel() {
if(this.numeroCartas)
    if (this.numeroCartas === this.contCartasGiradas  ) {
      this.gotoNextLevel();
    }
  }

  // Avanza a pantalla de resultados
  gotoNextScreen() {
    window.location.href = "felicidades.html";
  }

  //Guarda la puntuacion en el localstorage
  saveScore() {
    localStorage.setItem(this.user + "_score", this.puntos);
  }

  // Avanza al siguiente nivel, limpiando el tablero y generando otro con el nuevo nivel
  gotoNextLevel() {
    this.level += 1;
    if (this.level > 3) {
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
      console.log(rndIndex);
      levelCardsCount[rndIndex] += 1;
      const c = new Card(i, this.cardsImages.imagenes[rndIndex]);
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
    return this.cardsImages.imagenes.slice(0, maxCards);
  }
}
