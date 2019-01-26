console.log("validar")
if(localStorage.getItem('usuario') == null || localStorage.getItem('usuario') == undefined){
    window.location = "/login";
    console.log("login")
}