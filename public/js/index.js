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
