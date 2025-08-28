const productosDestacados = [
    {
        nombre: "Mesa Comedor Pampa",
        imagen: "../img/Mesa Comedor Pampa.png",
        descripcion: "Mesa extensible de roble macizo con tablero biselado y sistema de apertura suave."
    },
    {
        nombre: "Sillas Córdoba",
        imagen: "../img/Sillas Córdoba.png",
        descripcion: "Set de cuatro sillas apilables en contrachapado moldeado de nogal y estructura tubular pintada en Sage Green."
    }
];

const contenedor = document.querySelector('.productos-container');
productosDestacados.forEach(producto => {
    const productoDiv = document.createElement('div');
    productoDiv.classList.add('producto');

    const img = document.createElement('img');
    img.src = producto.imagen;
    img.alt = producto.nombre;

    const nombre = document.createElement('h3');
    nombre.textContent = producto.nombre;

    const descripcion = document.createElement('p');
    descripcion.textContent = producto.descripcion;

    productoDiv.appendChild(img);
    productoDiv.appendChild(nombre);
    productoDiv.appendChild(descripcion);

    contenedor.appendChild(productoDiv);
});