
const contenedor = document.querySelector('.productos-container');

fetch('../products.json')
  .then(response => response.json())
  .then(productos => {
    const destacados = productos.slice(0, 4);

    destacados.forEach(producto => {
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
  })
  .catch(error => {
    contenedor.textContent = 'No se pudieron cargar los productos.';
    console.error(error);
  });