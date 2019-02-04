var req = new XMLHttpRequest();
// Petición HTTP GET síncrona hacia el archivo fotos.json del servidor
const server=window.location.origin;//atrapa ruta del servidor
req.open("GET", server+"/front/getimagenes", false);

req.send(null);
const images = JSON.parse(req.responseText);

// const current_user= JSON.parse(imagesAvatar);
const user = JSON.parse(localStorage.getItem("sesion"));

const juego = new Juego(images, user); // Inicializar el juego
$(document).ready(function() {
  juego.mount("#game"); // Montar el juego al selector #game
});
