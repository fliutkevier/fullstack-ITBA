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
    },
    {
        nombre: "Silla de trabajo Belgrano",
        imagen: "../img/Silla de trabajo Belgrano.png",
        descripcion: "Silla ergonómica regulable en altura con respaldo de malla transpirable y asiento tapizado en tejido reciclado."
    },
    {
        nombre: "Escritorio Costa",
        imagen: "../img/Escritorio Costa.png",
        descripcion: "Escritorio compacto con cajón organizado y tapa pasacables integrada en bambú laminado. "
    }
];

const contenedor = document.querySelector('.productos-container');
productosDestacados.forEach(producto => {
    const productoDiv = document.createElement('div');
    productoDiv.classList.add('producto');

    const img = document.createElement('img');
    img.src = producto.imagen;
    img.alt = producto.nombre;

    const sliceTexto = document.createElement('div');
    sliceTexto.classList.add('slice-texto');

    const nombre = document.createElement('h3');
    nombre.textContent = producto.nombre;

    const descripcion = document.createElement('p');
    descripcion.textContent = producto.descripcion;

    sliceTexto.appendChild(nombre);
    sliceTexto.appendChild(descripcion);
    productoDiv.appendChild(img);
    productoDiv.appendChild(sliceTexto);
    contenedor.appendChild(productoDiv);
});