var req = new XMLHttpRequest();
// Petición HTTP GET síncrona hacia el archivo fotos.json del servidor
const server=window.location.origin;//atrapa ruta del servidor
req.open("GET", server+"/imagenes/responderFront", false);

req.send(null);
const images = JSON.parse(req.responseText);
console.log(images)
// const current_user= JSON.parse(imagesAvatar);
localStorage.setItem("alimentos",JSON.stringify(images))

// const juego = new Juego(images, user); // Inicializar el juego
// $(document).ready(function() {
//   juego.mount("#game"); // Montar el juego al selector #game
// });
