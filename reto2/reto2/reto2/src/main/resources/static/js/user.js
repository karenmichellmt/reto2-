var urlBaseUser = "/api/user";

var consultar = function () {
    $.ajax({
        url: urlBaseUser + "/all",
        type: "GET",
        dataType: "json",
        success: function (respuesta) {
            console.log(respuesta);
            actualizarTabla(respuesta);
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(status);
            alert("ha sucedido un problema");
        },
    });
};

var actualizarTabla = function (items) {
    var tabla = `<table class="table mt-2 table-bordered table-dark">
                  <tr>
                    <th>Identificacion</th>
                    <th>Nombre</th>
                    <th>Direccion</th>
                    <th>Telefono</th>
                    <th>E-mail</th>
                    <th>Contraseña</th>
                    <th>Zona</th>
                    <th>Tipo Usuario</th>
                  </tr>`;

    for (var i = 0; i < items.length; i++) {
        tabla += `<tr>
                   <td>${items[i].identification}</td>
                   <td>${items[i].name}</td>
                   <td>${items[i].address}</td>
                   <td>${items[i].cellPhone}</td>
                   <td>${items[i].email}</td>
                   <td>${items[i].password}</td>
                   <td>${items[i].zone}</td>
                   <td>${items[i].type}</td>
                   <td style="margin:0">
                    <button type="button" class="btn btn-warning" onclick="editar('${items[i].id}','${items[i].identification}','${items[i].name}','${items[i].address}','${items[i].cellPhone}','${items[i].email}','${items[i].password}','${items[i].zone}','${items[i].type}')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>
</button>
<button type="button" class="btn btn-sm btn-danger" onclick="deleteUser('${items[i].id}')">
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
</svg>
</button>
                   </td>
                </tr>`;
    }
    tabla += `</table>`;

    $("#tabla").html(tabla);
};

$(document).ready(function () {
     consultar();
});

var nuevo = function () {
    $('#accion').val("nuevo")
    $("#tituloModalUser").html("Nuevo Usuario");
    $("#id").val("");
    $("#identification").val("");
    $("#name").val("");
    $("#address").val("");
    $("#cellPhone").val("");
    $("#email").val("");
    $("#password").val("");
    $("#zone").val("");
    $("#type").val("");
    $("#modalUser").modal("show");
};

var cerrarModal = function () {
    $("#modalUser").modal("hide");
};

var mostrarMensaje = function (mensaje) {
    $("#mensaje").html(mensaje);
    $("#modalMensaje").modal("show");
};

var cerrarModalMensaje = function () {
    $("#modalMensaje").modal("hide");
};

var closeModalMessageCon = function () {
    $("#modalMensajeConfirmacion").modal("hide");
};

var guardarCambios = function (evento) { 
    var payload;
    var method;
    var accion= $("#accion").val();
    var msg;
    var ruta;

    if (
        $("#id").val().length == 0 ||
        $("#identification").val().length == 0 ||
        $("#name").val().length == 0 ||
        $("#address").val().length == 0 ||
        $("#cellPhone").val().length == 0 ||
        $("#email").val().length == 0 ||
        $("#password").val().length == 0 ||
        $("#zone").val().length == 0 ||
        $("#type").val().length == 0
    ) {
        alert("Todos los campos son obligatorios");
    } else {
        if (
            accion === "nuevo" 
        ) {
            ruta = urlBaseUser + "/new";
            payload = {
                id: +$("#id").val(),
                identification: +$("#identification").val(),
                name: $("#name").val(),
                address: $("#address").val(),
                cellPhone: +$("#cellPhone").val(),
                email: $("#email").val(),
                password: $("#password").val(),
                zone: $("#zone").val(),
                type: $("#type").val(),
            };
            method = "POST";
            msg = "se ha creado el usuario";
        } else if (accion === "actualizar")  {
            ruta = urlBaseUser + "/update";
            payload = {
                id: +$("#id").val(),
                identification: +$("#identification").val(),
                name: $("#name").val(),
                address: $("#address").val(),
                cellPhone: +$("#cellPhone").val(),
                email: $("#email").val(),
                password: $("#password").val(),
                zone: $("#zone").val(),
                type: $("#type").val(),
            };
            method = "PUT";
            msg = "se ha actualizado el usuarios";
            
        }
        $.ajax({
            url: ruta,
            type: method,
            dataType: "json",
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(payload),
            statusCode: {
                201: function () {
                    mostrarMensaje(msg);
                    cerrarModal();
                    consultar();
                },
            },
        });
    }
};

var editar = function (
    id,
    identification,
    name,
    address,
    cellPhone,
    email,
    password,
    zone,
    type

) {
    $("#tituloModalUser").html("Actualizar Usuario");
    $('#accion').val("actualizar")
    $("#id").val(id);
    $("#identification").val(identification);
    $("#name").val(name);
    $("#address").val(address);
    $("#cellPhone").val(cellPhone);
    $("#email").val(email);
    $("#password").val(password);
    $("#zone").val(zone);
    $("#type").val(type);
    $("#modalUser").modal("show");
};

var deleteUser = function (id) {
    var modalConfimacion = `<div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="tituloModalMensajeConfirmacion">Confirmar</h5>
                        </div>
                        <div class="modal-body">
                            <p id="mensajeCon">

                            </p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-warning" onclick="closeModalMessageCon()">CANCELAR</button>
                            <button type="button" class="btn btn-danger" onclick="deleteUser1('${id}')">ELIMINAR</button>
                        </div>
                    </div>
                </div>`;

    $("#modalMensajeConfirmacion").html(modalConfimacion);
    $("#mensajeCon").html("¿Esta seguro de eliminar el usuario?");
    $("#modalMensajeConfirmacion").modal("show");
};

var deleteUser1 = function (id) {
    console.log("eliminando id: " + id);
    $.ajax({
        url: urlBaseUser + "/" + id,
        type: "DELETE",
        dataType: "json",
        headers: {
            "Content-Type": "application/json",
        },
        statusCode: {
            204: function () {
                closeModalMessageCon();
                mostrarMensaje("Se ha eliminado el usuario");
                cerrarModal();
                consultar();
            },
        },
    });
};
