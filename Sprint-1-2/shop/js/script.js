const contenedorTarjetas = document.getElementById("productos-container");
const noResults = document.getElementById("noResults");
const searchInput = document.getElementById("searchInput");
const searchClear = document.getElementById("searchClear");
const searchResults = document.getElementById("searchResults");

let todosLosProductos = [];
let productosFiltrados = [];
let isSearching = false;

// Sugerencias populares para cuando no hay resultados
const sugerenciasBusqueda = [
  'aparador', 'biblioteca', 'butaca', 'sillón', 'sofá', 'cama','nogal', 'roble', 'mármol', 'lino', 'cuero'
];


// Función para normalizar texto (remover acentos)
function normalizarTexto(texto) {
  if (!texto) return '';
  return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function buscarProductos(termino) {
  if (!termino.trim()) {
    return todosLosProductos;
  }

  const terminoNormalizado = normalizarTexto(termino);
  
  return todosLosProductos.filter(producto => {
    const nombre = normalizarTexto(producto.nombre || '');
    const descripcion = normalizarTexto(producto.descripcion || '');
    const categoria = normalizarTexto(producto.categoria || '');
    const material = normalizarTexto(producto.material || '');
    
    return nombre.includes(terminoNormalizado) || 
           descripcion.includes(terminoNormalizado) ||
           categoria.includes(terminoNormalizado) ||
           material.includes(terminoNormalizado);
  });
}

function crearEstadoSinResultados(termino) {
  const sugerenciasAleatorias = [...sugerenciasBusqueda]
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);
  
  return `
    <div class="no-results-container">
      <div class="no-results-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="21 21l-4.35-4.35"></path>
          <line x1="9" y1="9" x2="13" y2="13"></line>
          <line x1="13" y1="9" x2="9" y2="13"></line>
        </svg>
      </div>
      
      <h3 class="no-results-title">No encontramos "${termino}"</h3>
      <p class="no-results-text">
        No se encontraron muebles que coincidan con tu búsqueda.<br>
        Intenta con términos más generales o revisa estas sugerencias:
      </p>
      
      <div class="no-results-suggestions">
        ${sugerenciasAleatorias.map(sugerencia => 
          `<span class="suggestion-tag" onclick="buscarSugerencia('${sugerencia}')">${sugerencia}</span>`
        ).join('')}
      </div>
      
      <button class="clear-search-btn" onclick="limpiarBusqueda()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="1,4 1,10 7,10"></polyline>
          <path d="M3.51,15a9,9,0,0,0,2.13,3.09,9,9,0,0,0,13.37,0,9,9,0,0,0,0-12.76,9,9,0,0,0-9.51-1.85"></path>
        </svg>
        Ver todos los productos
      </button>
    </div>
  `;
}

function mostrarCargando() {
  contenedorTarjetas.innerHTML = `
    <div class="search-loading show">
      <p style="font-family: 'Inter', sans-serif; color: var(--text); font-size: 14px;">
        Buscando productos
        <span class="loading-dots">
          <span class="loading-dot"></span>
          <span class="loading-dot"></span>
          <span class="loading-dot"></span>
        </span>
      </p>
    </div>
  `;
}

function actualizarInfoResultados(productos, termino) {
  const resultsDiv = searchResults;
  
  if (!termino.trim()) {
    resultsDiv.classList.remove('show');
    return;
  }

  const cantidad = productos.length;
  let mensaje = '';
  
  if (cantidad === 0) {
    mensaje = `No se encontraron productos para "<span class="search-highlight">${termino}</span>"`;
  } else if (cantidad === 1) {
    mensaje = `Se encontró <strong>1 producto</strong> para "<span class="search-highlight">${termino}</span>"`;
  } else {
    mensaje = `Se encontraron <strong>${cantidad} productos</strong> para "<span class="search-highlight">${termino}</span>"`;
  }
  
  resultsDiv.innerHTML = mensaje;
  resultsDiv.classList.add('show');
}

// Funciones globales para las sugerencias
window.buscarSugerencia = function(termino) {
  searchInput.value = termino;
  searchClear.classList.add('show');
  productosFiltrados = buscarProductos(termino);
  actualizarInfoResultados(productosFiltrados, termino);
  crearTarjetaProductoInicio(productosFiltrados);
  searchInput.focus();
};

window.limpiarBusqueda = function() {
  searchInput.value = '';
  searchClear.classList.remove('show');
  searchResults.classList.remove('show');
  productosFiltrados = todosLosProductos;
  crearTarjetaProductoInicio(todosLosProductos);
  searchInput.focus();
};

if (searchInput) {
  let timeoutId;
  searchInput.addEventListener('input', (e) => {
    const valor = e.target.value;
    
    if (valor) {
      searchClear.classList.add('show');
    } else {
      searchClear.classList.remove('show');
    }
    
    clearTimeout(timeoutId);
    
    if (valor.trim()) {
      isSearching = true;
      mostrarCargando();
      
      timeoutId = setTimeout(() => {
        productosFiltrados = buscarProductos(valor);
        actualizarInfoResultados(productosFiltrados, valor);
        crearTarjetaProductoInicio(productosFiltrados, valor);
        isSearching = false;
      }, 400);
    } else {
      timeoutId = setTimeout(() => {
        productosFiltrados = todosLosProductos;
        actualizarInfoResultados(productosFiltrados, valor);
        crearTarjetaProductoInicio(todosLosProductos);
        isSearching = false;
      }, 200);
    }
  });

  searchClear.addEventListener('click', () => {
    window.limpiarBusqueda();
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.limpiarBusqueda();
    }
  });
}

function crearTarjetaProductoInicio(productos, terminoBusqueda = '') {
  if (todosLosProductos.length === 0 && productos && productos.length > 0) {
    todosLosProductos = [...productos];
  }

  const productosExistentes = contenedorTarjetas.querySelectorAll('.tarjeta-producto');
  if (productosExistentes.length > 0) {
    productosExistentes.forEach((card, i) => {
      setTimeout(() => {
        card.classList.add('fade-out');
      }, i * 30);
    });
    
    setTimeout(render, 300);
  } else {
    render();
  }

  function render() {
    contenedorTarjetas.innerHTML = "";

    if (!productos || productos.length === 0) {
      if (terminoBusqueda) {
        contenedorTarjetas.innerHTML = crearEstadoSinResultados(terminoBusqueda);
      } else {
        if (noResults) {
          noResults.style.display = "block";
          noResults.innerHTML = crearEstadoSinResultados('');
        }
      }
      return;
    }
    
    if (noResults) noResults.style.display = "none";

    productos.forEach((producto, i) => {
      const card = document.createElement("article");
      card.className = "tarjeta-producto";

      card.innerHTML = `
        <a class="card__link" aria-label="${producto.nombre}">
          <div class="card__img-wrap">
            <img src="${encodeURI(producto.imagen)}" class="card_img" alt="${producto.nombre}">
          </div>
        </a>

        <div class="card__body">
          <h3 class="card__title">${producto.nombre}</h3>
          <p class="card__desc">${producto.descripcion || ""}</p>
          <div class="card__actions">
            <a href="../detalle/index.html?id=${producto.id}" class="btn-ghost">Vista previa</a>
            <button type="button" class="btn-ghost btn-cart">Agregar al carrito</button>
          </div>
        </div>
      `;

      contenedorTarjetas.appendChild(card);

      setTimeout(() => {
        card.classList.add('fade-in-stagger');
      }, i * 50);

      const btnCart = card.querySelector(".btn-cart");
      if (btnCart) {
        btnCart.addEventListener("click", () => agregarAlCarrito(producto));
      }

      const btnQuick = card.querySelector(".btn-quick");
      if (btnQuick) {
        btnQuick.addEventListener("click", () => {
          console.log("Vista rápida de:", producto.nombre);
        });
      }
    });
  }
}

crearTarjetaProductoInicio(products);