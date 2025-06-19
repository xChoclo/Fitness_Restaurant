document.addEventListener("DOMContentLoaded", function () {
    const pedirButtons = document.querySelectorAll(".buttonPlatos");
    const cartSidebar = document.getElementById("cart-sidebar");
    const overlay = document.getElementById("overlay");
    const closeCart = document.getElementById("close-cart");
    const cartItemsContainer = document.getElementById("cart-items");
    const confirmModal = document.getElementById("confirm-modal");
    const confirmYes = document.getElementById("confirm-yes");
    const confirmNo = document.getElementById("confirm-no");
    const checkoutButton = document.getElementById("checkout");

    let pendingRemovalItem = null;

    // Agregar platos al carrito
    pedirButtons.forEach(button => {
        button.addEventListener("click", function () {
            const platoElement = this.closest(".contenedoresPlatos");
            const plato = platoElement.querySelector(".nombrePlato").innerText;
            const precio = platoElement.querySelector(".precio p").innerText;
            const imagenSrc = platoElement.querySelector("img").src;

            let existingItem = document.querySelector(`.cart-item[data-name="${plato}"]`);

            if (existingItem) {
                let quantitySpan = existingItem.querySelector(".quantity");
                quantitySpan.textContent = parseInt(quantitySpan.textContent) + 1;
            } else {
                const newItem = document.createElement("div");
                newItem.classList.add("cart-item");
                newItem.setAttribute("data-name", plato);
                newItem.innerHTML = `
                    <img src="${imagenSrc}" alt="${plato}" class="cart-item-img">
                    <div class="cart-item-details">
                        <p class="cart-item-name">${plato}</p>
                        <b class="cart-item-price">${precio}</b>
                        <div class="quantity-controls">
                            <button class="decrease">-</button>
                            <span class="quantity">1</span>
                            <button class="increase">+</button>
                        </div>
                    </div>
                `;
                cartItemsContainer.appendChild(newItem);

                newItem.querySelector(".increase").addEventListener("click", function () {
                    let quantitySpan = newItem.querySelector(".quantity");
                    quantitySpan.textContent = parseInt(quantitySpan.textContent) + 1;
                });

                newItem.querySelector(".decrease").addEventListener("click", function () {
                    let quantitySpan = newItem.querySelector(".quantity");
                    if (parseInt(quantitySpan.textContent) > 1) {
                        quantitySpan.textContent = parseInt(quantitySpan.textContent) - 1;
                    } else {
                        pendingRemovalItem = newItem;
                        confirmModal.style.display = "flex";
                        confirmModal.style.position = "fixed";
                    }
                });
            }

            cartSidebar.style.right = "0";
            overlay.style.opacity = "1";
            overlay.style.visibility = "visible";
        });
    });

    // Cerrar el carrito
    closeCart.addEventListener("click", function () {
        cartSidebar.style.right = "-350px";
        overlay.style.opacity = "0";
        overlay.style.visibility = "hidden";
    });

    // Confirmación para eliminar plato
    confirmYes.addEventListener("click", function () {
        if (pendingRemovalItem) {
            pendingRemovalItem.remove();
            pendingRemovalItem = null;
        }
        confirmModal.style.display = "none";
    });

    confirmNo.addEventListener("click", function () {
        confirmModal.style.display = "none";
    });

    // Finalizar compra (checkout)
    if (checkoutButton) {
        checkoutButton.addEventListener("click", function () {
            console.log("Botón de checkout presionado");

            // Obtener los datos del carrito
            const cartItems = document.querySelectorAll(".cart-item");
            const carrito = Array.from(cartItems).map(item => ({
                nombre: item.querySelector(".cart-item-name").innerText,
                cantidad: item.querySelector(".quantity").innerText,
                precio: item.querySelector(".cart-item-price").innerText,
            }));

            const total = carrito.reduce((sum, item) => {
                return sum + parseFloat(item.precio.replace(/[^0-9.-]+/g, "")) * parseInt(item.cantidad);
            }, 0);

            // Enviar los datos al servidor
            fetch("/crear_factura/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCookie("csrftoken"),
                },
                body: JSON.stringify({
                    carrito: carrito,
                    total: total,
                }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    alert(data.message);
                    window.location.href = "/sistema_envios/";
                } else if (data.error) {
                    alert(data.error);
                }
            })
            .catch(error => console.error("Error:", error));
        });
    } else {
        console.error("Botón de checkout no encontrado");
    }
});

// Función para obtener el token CSRF
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + "=")) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}