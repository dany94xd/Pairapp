



var conten=document.getElementById("contenAvatares");


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


  //variable para manejar el tiempo

//   var tiempo = avatar.usuarios.tiempo;
//   console.log(tiempo);
//   tiempo= tiempo.substring(18, 19);
//     tiempo=parseInt(tiempo, 10);

//     setTimeout(redireccionar, tiempo*1000);

// console.log("sesion");


}

// function redireccionar(){
//   window.location= "/front/game";
// }

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
