var urlBaseChocolate = "/api/chocolate";

var consultar = function () {
    $.ajax({
        url: urlBaseChocolate + "/all",
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
                    <th>Referencia</th>
                    <th>Categoria</th>
                    <th>Descripcion</th>
                    <th>Disponibilidad</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Fotografía</th>
                  </tr>`;

    for (var i = 0; i < items.length; i++) {
        tabla += `<tr>
                   <td>${items[i].reference}</td>
                   <td>${items[i].category}</td>
                   <td>${items[i].description}</td>
                   <td>${items[i].availability}</td>
                   <td>${items[i].price}</td>
                   <td>${items[i].quantity}</td>
                   <td>${items[i].photography}</td>
                   <td style="margin:0">
                    <button type="button" class="btn btn-warning" onclick="editar('${items[i].reference}','${items[i].category}','${items[i].description}','${items[i].availability}','${items[i].price}','${items[i].quantity}','${items[i].photography}')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>
</button>
<button type="button" class="btn btn-sm btn-danger" onclick="deleteChocolate('${items[i].reference}')">
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
    $("#tituloModalChocolate").html("Nuevo Producto");
    $("#reference").val("");
    $("#category").val("");
    $("#description").val("");
    $("#availability").val("");
    $("#price").val("");
    $("#quantity").val("");
    $("#photography").val("");
    $("#modalChocolate").modal("show");
};

var cerrarModal = function () {
    $("#modalChocolate").modal("hide");
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

var guardarCambioschocolate = function () {
    var payload;
    var method;
    var reference = $("#reference").val();
    var msg;
    var ruta;

    if (
        $("#reference").val().length == 0 ||
        $("#category").val().length == 0 ||
        $("#description").val().length == 0 ||
        $("#availability").val().length == 0 ||
        $("#price").val().length == 0 ||
        $("#quantity").val().length == 0 ||
        $("#photography").val().length == 0
    ) {
        alert("Todos los campos son obligatorios");
    } else {
        if (
            reference !== "undefined" &&
            reference !== null &&
            reference.length > 0
        ) {
            ruta = urlBaseChocolate + "/new";
            payload = {
                reference: $("#reference").val(),
                category: $("#category").val(),
                description: $("#description").val(),
                availability: $("#availability").val(),
                price: +$("#price").val(),
                quantity: +$("#quantity").val(),
                photography: $("#photography").val(),
            };
            method = "POST";
            msg = "Se ha creado el producto";
        } else {
            ruta = urlBaseChocolate + "/update";
            payload = {
                reference: +$("#reference").val(),
                category: $("#category").val(),
                description: $("#description").val(),
                availability: $("#availability").val(),
                price: +$("#price").val(),
                quantity: $("#quantity").val(),
                photography: $("#photography").val(),
            };
            method = "PUT";
            msg = "se ha actualizado el producto";
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
    reference,
    category,
    description,
    availability,
    price,
    quantity,
    photography
) {
    $("#tituloModalChocolate").html("Actualizar Producto");
    $("#reference").val(reference);
    $("#category").val(category);
    $("#description").val(description);
    $("#availability").val(availability);
    $("#price").val(price);
    $("#quantity").val(quantity);
    $("#photography").val(photography);
    $("#modalChocolate").modal("show");
};

var deleteChocolate = function (reference) {
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
                            <button type="button" class="btn btn-danger" onclick="deleteChocolate1('${reference}')">ELIMINAR</button>
                        </div>
                    </div>
                </div>`;

    $("#modalMensajeConfirmacion").html(modalConfimacion);
    $("#mensajeCon").html("¿Esta seguro de eliminar el producto?");
    $("#modalMensajeConfirmacion").modal("show");
};

var deleteChocolate1 = function (reference) {
    console.log("eliminando reference: " + reference);
    $.ajax({
        url: urlBaseChocolate + "/" + reference,
        type: "DELETE",
        dataType: "json",
        headers: {
            "Content-Type": "application/json",
        },
        statusCode: {
            204: function () {
                closeModalMessageCon();
                mostrarMensaje("Se ha eliminado el producto");
                cerrarModal();
                consultar();
            },
        },
    });
};
