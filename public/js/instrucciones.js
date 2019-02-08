
cadVariables=JSON.parse(localStorage.getItem("sesion"));
colocarAvatar(cadVariables);

function colocarAvatar(avatar){
  let img = document.getElementById("fotoavatar");
  //var nombre="avatar1.png";
  
  img.src=avatar.foto;
  img.className="personalImg";
}







