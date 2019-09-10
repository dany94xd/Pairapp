function readURL(input, id, tipo=false) {
    //console.log(id)
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            //console.log(e.target.result);

            //$('#'+id).attr('src', e.target.result);
            //$('#'+id).attr('value', e.target.result);

            if(tipo) {
                $('#'+id).attr('src', e.target.result);
                $('#'+id+'_').attr('value', e.target.result);
            }
        }

        reader.readAsDataURL(input.files[0]);
    }
}

/*if($("#foto_perfil").length) {
    $("#foto_perfil").change(function(){
        readURL(this, "input_foto_perfil");
    });
}*/


if($('#foto_editar').length) {
    $("#foto_editar").change(function(){
        readURL(this, "img_foto", true);
    });

}

if($('#nombre_editar').length) {
    $("#nombre_editar").change(function(){
        readURL(this, "img_nombre", true);
    });

}

if($('#alimento_editar').length) {
    $("#alimento_editar").change(function(){
        readURL(this, "img_alimento", true);
    });

}

