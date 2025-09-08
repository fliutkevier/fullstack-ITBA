function actualizarContadorCarrito() {
    let count = 0;
    const memoria = JSON.parse(sessionStorage.getItem("products")) || [];
    count = memoria.reduce((acc, item) => acc + (item.cantidad || 1), 0);
    const countElem = document.getElementById('carrito-count');
    if (countElem) countElem.textContent = count;
}

const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get("id"));

fetch("../products.json")
    .then(response => response.json())
    .then(data => {
        const productoElegido = data.find(p => p.id === productId);

        if (productoElegido) {
            const img = document.getElementById("producto-img");
            const titulo = document.getElementById("producto-titulo");
            const descripcion = document.getElementById("producto-descripcion");
            const especificaciones = document.getElementById("especificaciones-producto");

            img.src = '../' + productoElegido.imagen;
            img.alt = productoElegido.nombre;
            titulo.textContent = productoElegido.nombre.toUpperCase();
            descripcion.textContent = productoElegido.descripcion;

            const campos = ["medidas", "materiales", "acabado", "peso", "capacidad", "confort", "modulares", "tapizado", "rotacion", "garantia", "cargaMaxima", "almacenamiento", "caracteristicas", "colchon", "relleno", "sostenibilidad", "extension", "apilables", "incluye", "cables", "regulacion", "certificacion"];

            campos.forEach(campo => {
                if (productoElegido[campo]) {
                    const li = document.createElement("li");

                    const spanClave = document.createElement("span");
                    spanClave.className = "clave";
                    spanClave.textContent = campo.charAt(0).toUpperCase() + campo.slice(1) + ":";

                    const spanValor = document.createElement("span");
                    spanValor.className = "valor";
                    spanValor.textContent = productoElegido[campo];

                    li.appendChild(spanClave);
                    li.appendChild(document.createTextNode(" "));
                    li.appendChild(spanValor);

                    especificaciones.appendChild(li);
                }
            });

            const btnCarrito = document.getElementById("añadir-carrito");
            if (btnCarrito) {
                btnCarrito.addEventListener("click", function() {
                    if (typeof agregarAlCarrito === 'function') {
                        agregarAlCarrito(productoElegido);
                    }
                    actualizarContadorCarrito();
                });
            }
        }
    })
    .catch(error => console.error("Error al cargar el JSON:", error));

