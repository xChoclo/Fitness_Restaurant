document.addEventListener("DOMContentLoaded", function () {
    const selectPagos = document.getElementById("pagos");
    const formularioPagos = document.getElementById("formulario_pagos");
    const botonPagar = document.getElementById("button_pagar");

    selectPagos.addEventListener("change", function () {
        const metodoSeleccionado = this.value;
        formularioPagos.innerHTML = ""; // Limpiar

        let campos = "";

        if (metodoSeleccionado === "PSE") {
            campos = `
                <label class="label-js">Pago con PSE</label>
                <a class="button_pse" href="https://www.pse.com.co" target="_blank">Redireccionar a PSE</a>
            `;
        } else if (metodoSeleccionado === "tarjetas") {
            campos = `
                <label class="label-js">Pago con tarjeta</label>
                <input type="text" name="nombre_tarjeta" class="input-js" placeholder="Nombre del titular" required>
                <input type="text" name="numero_tarjeta" class="input-js" placeholder="Número de tarjeta" required>
                <input type="text" name="vencimiento_tarjeta" class="input-js" placeholder="Fecha vencimiento (MM/AA)" required>
                <input type="text" name="cvv_tarjeta" class="input-js" placeholder="CVV" required>
            `;
        }

        // Mostrar si hay algo válido
        if (metodoSeleccionado === "tarjetas" ) {
            formularioPagos.innerHTML = campos;
            botonPagar.style.display = "block";
        } else if (metodoSeleccionado === "PSE"){
            formularioPagos.innerHTML = campos;
            botonPagar.style.display = "none";
        } else {
            botonPagar.style.display = "none";
        }
    });
});