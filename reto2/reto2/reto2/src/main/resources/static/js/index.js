var urlBaseUser = "/api/user";
/**
 * Cargar la libreria de JQuery y ubicar el cursor en el campo login
 */

 $(document).ready (function(){
    $("#useremail").focus();
});
/**
 * Autenticar usuario en sistema
 */
function login(){
    //Leer datos
    let email= $("#useremail").val();
    let password = $("#password").val();
    //Generar una peticion tipo ajax para validar login
    if(validar()){
        $.ajax ({
            url: urlBaseUser +"/" + email + "/" + password,
            type: 'GET',
            dataType: 'json',
            contentType: "aplication/JSON",
            success: function(respuesta){
                console.log(respuesta);
                autenticacion(respuesta);
                limpiarCampos();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("Algo fallo");
            }
        });
    }
}

function autenticacion(respuesta){
    console.log (respuesta);
    if(respuesta.email  === null && respuesta.password === null){
        alert("Contraseña incorrecta o Usuario no existe");
    }else if(respuesta.type !== "ADM" ){
        alert("No eres Administrador");

    }else{
        alert("Bienvenido "+respuesta.name);
        $("#name").text(respuesta.name);
        location.href ="inicio.html";
    }
}


function limpiarCampos(){
    $("#useremail").val(""),
    $("#password").val("");
}

function validaesVacio(dato){
    return !dato.trim().length;
}

function validar(){
    //obtiene valores
    let email = $("#useremail").val();
    let password = $("#password").val();  
    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if( validaesVacio(email)) { 
        errores="email vacio<br>";
        alert("Todos los campos deben estar completos");
        $("#useremail").focus();
        return false;
    }else if (!emailRegex.test($("#useremail").val())) {
        $("#useremail").css("border", "1px solid red");
            $("#badEmail").css("display", "block");
            $("#badEmail").text("La direccion de correo es invalida");   
    }else if( validaesVacio(password)) {
        errores="password vacio<br>";
        alert("Todos los campos deben estar completos");
        $("#password").focus();
        return false;
    }else {
        return true;

    } 
    
    
}
    //valida que los campos no sean vacios
//     if( validaesVacio(email)) { 
//         errores="email vacio<br>";
//         alert("Todos los campos deben estar completos");
//         $("#useremail").focus();
//         return false;
//     }else if( validaesVacio(password)) {
//         errores="password vacio<br>";
//         alert("Todos los campos deben estar completos");
//         $("#password").focus();
//         return false;
//     }else{
//         return true;

//     }
//}