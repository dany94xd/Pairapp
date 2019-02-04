// jQuery("body").trigger("click");
// $(document).ready(function(){
//   $("body").click(function (){
//     sonido_bg.volume = 0.3;

//     sonido_bg.play();
//     escogePersonaje.volume =1;
//     escogePersonaje.play();
//   });
// });


// var sonido_bg =document.getElementById('background-music');
// sonido_bg.preload = "auto";

// var escogePersonaje =document.getElementById('elige-personaje');
// escogePersonaje.preload = "auto";

//accion.addEventListener("click", colocarAvatar);

var conten=document.getElementById("contenAvatares");

//var datos=JSON.parse(localStorage.getItem("avatares"));
//var imagenesJson=JSON.parse(localStorage.getItem("imagenes"));
var mostra="";

/*for (var img in datos) {
  var celda = document.createElement("div");
  var puntos= document.createElement("h4");
    celda.className="misavatares";
    //esto como es un arreglo datos[]
  puntos.textContent=datos[img].puntos+" puntos";
  var imagenAvatar = document.createElement("img");
  if(datos[img].nombre.substring(0,4)=="data"){
    imagenAvatar.src=datos[img].nombre;
    imagenAvatar.className="rounded-circle";
  }else
  imagenAvatar.src='../img/'+datos[img].nombre+'';
  imagenAvatar.setAttribute("onclick","sesion("+img+")");
  var link = document.createElement("a");
 link.href='video.html';
//le metemos los valores al div celda es um div
celda.appendChild(puntos);
celda.appendChild(link);

link.appendChild(imagenAvatar);
conten.appendChild(celda); //agrega los avatares

//console.log(datos[img]);
}*/

//crea una variable avatar
function sesion(indice){
  var avatar;
  var req = new XMLHttpRequest();
// Petición HTTP GET síncrona hacia el archivo fotos.json del servidor
const server=window.location.origin;//atrapa ruta del servidor 
req.open("GET", server+"/front/consultUserId"+indice, false);

req.send(null);
avatar= JSON.parse(req.responseText);
console.log("sesion");

//  localStorage.clear();
  localStorage.setItem("sesion",JSON.stringify(avatar.usuarios));

}

//var descargar=document.getElementById("export-button");
//descargar.addEventListener('click', exportJSON);

function exportJSON() {
    //var IEwindow = window.open();
    //IEwindow.document.write('sep=,\r\n' + JSON.stringify(objJSON));
    //IEwindow.document.close();
    //IEwindow.document.execCommand('SaveAs', true, "datos.json");
    //IEwindow.close();

    let dataStr ="avatares=["+ JSON.stringify(datos)+"]\n";
    dataStr = dataStr+"imagenes=["+JSON.stringify(imagenesJson)+"]";
    let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    let exportFileDefaultName = '../objetos.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}
