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

            img.src = productoElegido.imagen;
            img.alt = productoElegido.nombre;
            titulo.textContent = productoElegido.nombre.toUpperCase();
            descripcion.textContent = productoElegido.descripcion;
            especificaciones.innerHTML = "";

            const campos = ["medidas", "materiales", "acabado", "peso", "capacidad", "confort", "modulares", "tapizado", "rotacion", "garantia", "cargaMaxima", "almacenamiento", "caracteristicas", "colchon", "relleno", "sostenibilidad", "extension", "apilables", "incluye", "cables", "regulacion", "certificacion"];

            campos.forEach(campo => {
                if (productoElegido[campo]) {
                    const li = document.createElement("li");
                    li.innerHTML = `<span class="clave">${campo.charAt(0).toUpperCase() + campo.slice(1)}:</span> <span class="valor">${productoElegido[campo]}</span>`;
                    especificaciones.appendChild(li);
                }
            });
        }
    })
    .catch(error => console.error("Error al cargar el JSON:", error));

