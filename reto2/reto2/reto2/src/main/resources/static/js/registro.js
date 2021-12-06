var urlBaseUser = "/api/user";

$(document).ready (function(){
    $("#username").focus();
});

function registrarse(){
    if(validar()==true){
        validarExisteEmail();
    }
}

function crearUsuario(){
    let myData={
        email:$("#useremail").val(),
        password:$("#password").val(),
        name:$("#username").val()  
    };
    let dataToSend=JSON.stringify(myData);
    if(validar()==true && validaContraseña()==true){
        $.ajax ({
            url:urlBaseUser +"/" + "new",
            type:"POST",
            data:dataToSend,
            datatype:'JSON',
            contentType:'application/json',
            success: function(){
                console.log("Creación exitosa");
                limpiarCampos();
                alert("Nuevo Usuario Creado");
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log("Algo fallo");
            }
        });
    }
}

function validarExisteEmail(){
    //Leer datos
    let email= $("#useremail").val();
    //Generar una peticion tipo ajax para validar login
    $.ajax ({
        url: urlBaseUser + "/" +email,
        type: 'GET',
        dataType: 'json',
        contentType: "aplication/JSON",
        success: function(respuesta){
            console.log(respuesta);
            if(respuesta==true){
                alert("Ya existe una cuenta asociada a este email");
                $("#useremail").focus();
                $("#password").val("");
                $("#passwordrepeat").val("");
                return true;
            }else{
                crearUsuario();
                return false
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Algo fallo");
        }
    });
}

function validaesVacio(dato){
    return !dato.trim().length;
}

function validar(){
    //obtiene valores
    let name = $("#username").val(); 
    let email = $("#useremail").val();
    let password = $("#password").val();
    let passwordrepeat = $("#passwordrepeat").val();   
    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (emailRegex.test($("#useremail").val())) {
        if( validaesVacio(email)) { 
            errores="email vacio<br>";
            alert("Todos los campos deben estar completos");
            $("#useremail").focus();
            return false;
        }else if( validaesVacio(password)) {
            errores="password vacio<br>";
            alert("Todos los campos deben estar completos");
            $("#password").focus();
            return false;
        }else{
            return true;
            
        }
    }else{
        $("#useremail").css("border", "1px solid red");
            $("#badEmail").css("display", "block");
            $("#badEmail").text("La direccion de correo es invalida");
    }

    //valida que los campos no sean vacios
    if(validaesVacio(name)){
        errores="name vacio<br>";
        alert("Todos los campos deben estar completos");
        $("#username").focus();
        return false;
    }else if(validaesVacio(email)) { 
        errores="email vacio<br>";
        alert("Todos los campos deben estar completos");
        $("#useremail").focus();
        return false;
    }else if(validaesVacio(password)) {
        errores="password vacio<br>";
        alert("Todos los campos deben estar completos");
        $("#password").focus();
        return false;
    }else if(validaesVacio(passwordrepeat)) {
        errores="password vacio<br>";
        alert("Todos los campos deben estar completos");
        $("#passwordrepeat").focus();
        return false;
    }else{
        console.log("true");
        return true;
    }
}

function limpiarCampos(){
    $("#username").val("");
    $("#useremail").val("");
    $("#password").val("");
    $("#passwordrepeat").val("");
    location.href ="index.html";
}

function validaContraseña(){
    let password= $("#password").val()
    let passwordrepeat= $("#passwordrepeat").val()
    if(password==passwordrepeat){
        console.log("true");
        return true;
    }else{
        alert ("Las contraseñas deben coincidir");
        $("#password").val("")
        $("#passwordrepeat").val("")
        $("#password").focus();
        console.log("false");
        return false;
    }
}