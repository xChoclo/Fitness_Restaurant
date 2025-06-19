document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ JavaScript cargado correctamente.");

    const passwordInput = document.getElementById("contraseña");
    const confirmPasswordInput = document.getElementById("confirmar_contraseña");
    const submitBtn = document.getElementById("submitBtn");
    const errorMsg = document.getElementById("mensaje-error");
    const switchInput = document.getElementById("selector");
    const loginForm = document.getElementById("loginForm");



    function checkPasswordMatch() {
        if (!passwordInput || !confirmPasswordInput) return true;

        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        return password === confirmPassword && password.length > 0;
    }

    // ✅ Asignar acción inicial al formulario según el estado del switch
    function asignarAccionFormulario() {
        if (switchInput.checked) {
            submitBtn.textContent = "Registrarse";
            loginForm.action = urlCrearCliente;
        } else {
            submitBtn.textContent = "Iniciar Sesión";
            loginForm.action = urlIniciarSesion;
        }
    }

    asignarAccionFormulario();

    document.querySelector(".formulario").addEventListener("submit", function (event) {
        const esRegistro = switchInput?.checked;
        const checkTerminos = document.getElementById("checkTerminos");

        if (esRegistro) {
            if (!checkPasswordMatch()) {
                event.preventDefault();
                errorMsg.style.display = "block";
                return;
            } else {
                errorMsg.style.display = "none";
            }

            if (!checkTerminos?.checked) {
                event.preventDefault();
                mostrarToast("Debes aceptar los términos y condiciones para registrarte");
                return;
            }
        }
    });


    
    if (switchInput) {
        switchInput.addEventListener("change", function () {
            setTimeout(() => {
                const confirmPasswordInput = document.getElementById("confirmar_contraseña");
                if (confirmPasswordInput) {
                    confirmPasswordInput.addEventListener("input", checkPasswordMatch);
                }
            }, 300);
    
            asignarAccionFormulario();
        });
    }


    function mostrarToast(mensaje, tipo = "error") {
        const toastContainer = document.getElementById("toast-container");
        const nuevoToast = document.createElement("div");
        nuevoToast.classList.add("toast", `toast-${tipo}`);
        nuevoToast.textContent = mensaje;

        toastContainer.appendChild(nuevoToast);

        setTimeout(() => {
            nuevoToast.remove();
        }, 3000);
    }

});
