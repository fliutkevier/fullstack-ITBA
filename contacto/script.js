const formulario = document.getElementById("contactForm");
const estado = document.getElementById("estado");

function handlesubmit(event) {
    event.preventDefault();

    const name = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const mensaje = document.getElementById("message").value;
    const validarEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !mensaje) {
        estado.textContent = "Por favor, complete los campos";
        estado.className = "error";
        return;
    }

    if (!validarEmail.test(email)) {
        estado.textContent = "Email inválido.";
        estado.className = "error";
        return;
    }

    estado.textContent = "Muchas gracias por su consulta.";
    estado.className = "ok";
}

formulario.addEventListener("submit", handlesubmit);
