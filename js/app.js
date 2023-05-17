///LOADER
window.addEventListener("load", function(){
  document.getElementById("loader").classList.toggle("loader2")
})
//Guardar datos del carrito antes de volver a recargar la página.
window.addEventListener('beforeunload', function() {
  guardarDatosShopcart();
});


//DOMContentEvent para los datos guardados previamente, si es que hay
document.addEventListener('DOMContentLoaded', function() {
  cargarDatosShopcart(); // Cargar los datos del carrito al cargar la página
  actualizarShopcart();
  actualizarTotalProd();
});
window.addEventListener('load', function() {
  actualizarTotalProd();
});
///PÁGINA PRODUCTOS

let productos = [];
const productContainer = document.querySelector('#product-container');
let shopcart = [];
let totalShopcart = 0;
let totalItems = 0;

///
// Para obtener los datos de data.json
fetch('json/data.json')
  .then(response => response.json())
  .then(data => {
    productos = data.productos;
    cargarDatosShopcart();

    // Div por cado producto
    productos.forEach(({ id, imagen, nombre, precio}) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('producto');
        productDiv.innerHTML = `
          <div class="card">
            <img src="${imagen}" alt="${nombre}" />
            <h3>${nombre}</h3>
            <p>Precio: €${precio}</p>
            <button id="agregarcar" onclick="agregarAlShopcart(${id})">Agregar al carrito</button>
            <div class="confirmacion">Producto agregado al carrito</div>
          </div>
        `;
        productContainer.appendChild(productDiv);

        ///Eventos:
        const cards = document.querySelectorAll('.card');

        // Agregar un evento de clic a cada botón de "Agregar al carrito"
        cards.forEach(card => {
        const button = card.querySelector('button');

        button.addEventListener('click', function() {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Se ha agregado al carrito',
                showConfirmButton: false,
                timer: 800
              })
        });
      
        button.addEventListener('mouseover', function(){
          this.style.color = 'white';
          this.style.backgroundColor = "#9e4806";
          this.style.borderColor = "#9e4806";
        });
      
        button.addEventListener('mouseout', function(){
          this.style.color = 'white';
          this.style.backgroundColor = "#212121";
          this.style.borderColor = "#212121";
        });

  });
      });
  
  })
  .catch(error => console.error('Error al obtener los datos del archivo JSON', error));

////  

  ///Carrito de compras, agregar al carrito
const agregarAlShopcart = (id) => {
  const producto = productos.find((p) => p.id === id);
  const existeEnShopcart = shopcart.find((p) => p.id === id);
  if (existeEnShopcart) {
    existeEnShopcart.cantidad++;
  } else {
    shopcart.push({ ...producto, cantidad: 1 });
  }
  totalItems++;
  calcularTotal();
  actualizarShopcart();
  actualizarTotal();
  actualizarTotalProd();
  guardarDatosShopcart(); 
};

//Para eliminar del carrito
const eliminarDelShopcart = (id) => {
  const item = shopcart.find((p) => p.id === id);
  if (item.cantidad > 1) {
    item.cantidad--;
  } else {
    shopcart.splice(shopcart.indexOf(item), 1);
  }
  totalItems--;
  calcularTotal();
  actualizarShopcart();
  actualizarTotal();
  actualizarTotalProd();
  guardarDatosShopcart(); 
};

//Vaciar el carrito
const vaciarShopcart = () => {
  shopcart.splice(0, shopcart.length);
  totalShopcart = 0;
  totalItems = 0;
  actualizarShopcart();
  actualizarTotal();
  actualizarTotalProd();
  guardarDatosShopcart(); 
};

///Calcular el total
const calcularTotal = () => {
  totalShopcart = shopcart.reduce((total, p) => total + p.precio * p.cantidad, 0);
};

//Actualizar y mostrar el producto, cantidad y precio, además para poder eliminar en caso de que no se quiera.
const actualizarShopcart = () => {
    const shopcartElemento = document.getElementById('shopcart');
    shopcartElemento.innerHTML = '';
    shopcart.forEach(({ id, nombre, cantidad }) => {
      const itemShopcart = `
        <li>
          ${nombre} - Cantidad: ${cantidad}
          <button onclick="eliminarDelShopcart(${id})">Eliminar</button>
        </li>
      `;
      shopcartElemento.innerHTML += itemShopcart;
    });
  };

  ///Total
const actualizarTotal = () => {
  const totalElemento = document.getElementById('total');
  totalElemento.textContent = `Total: €${totalShopcart}`;
};

///Cantidad de productos en carrito
const actualizarTotalProd = () => {
    const totalProdElemento = document.getElementById('totalCant');
    totalProdElemento.textContent = `${totalItems}`;
};

const confirmacionFinal = () => {
  if (shopcart.length === 0) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Debe agregar al menos un producto para realizar esta operación.',
    })
  } else {
    Swal.fire({
      icon: 'success',
      title: 'Compra Finalizada...',
      text: 'Muchas gracias por confiar en nosotros.',
    })
  }
};



//Funciones para que se guarden las cosas dentro del carrito en el localStorage:
const guardarDatosShopcart = () => {
  localStorage.setItem('shopcart', JSON.stringify(shopcart));
  localStorage.setItem('totalItems', JSON.stringify(totalItems));
};

// Función para cargar los datos del carrito desde el localStorage
const cargarDatosShopcart = () => {
  try {
    if (localStorage.getItem('shopcart')) {
      shopcart = JSON.parse(localStorage.getItem('shopcart'));
      totalItems = JSON.parse(localStorage.getItem('totalItems'));
    }
  } catch (error) {
    console.error('Error al cargar los datos del carrito:', error);
  } finally {
    // Código que se ejecuta siempre, independientemente de si se produjo una excepción o no
    actualizarTotalProd();
  }
};


// FILTROS
const filtrarPorPrecio = (productos, precioMin, precioMax) => {
  return productos.filter((producto) => producto.precio >= precioMin && producto.precio <= precioMax);
};

const filtrarAlfabeticamente = (productos, orden) => {
  if (orden === 'ascendente') {
    return productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
  } else if (orden === 'descendente') {
    return productos.sort((a, b) => b.nombre.localeCompare(a.nombre));
  } else {
    return productos;
  }
};

const filtroPrecio = document.getElementById('filtro-precio');
const filtroAlfabeticamente = document.getElementById('filtro-alfabetico');

filtroPrecio.addEventListener('change', () => {
  const [precioMin, precioMax] = filtroPrecio.value.split('-').map(Number);
  const productosFiltrados = filtrarPorPrecio(productos, precioMin, precioMax);
  actualizarVisualizacion(productosFiltrados);
});

filtroAlfabeticamente.addEventListener('change', () => {
  const orden = filtroAlfabeticamente.value;
  const productosFiltrados = filtrarAlfabeticamente(productos, orden);
  actualizarVisualizacion(productosFiltrados);
});

// Función para actualizar la visualización de los productos
const actualizarVisualizacion = (productosFiltrados) => {
  productContainer.innerHTML = '';
  productosFiltrados.forEach(({ id, imagen, nombre, precio }) => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('producto');
    productDiv.innerHTML = `
      <div class="card">
        <img src="${imagen}" alt="${nombre}" />
        <h3>${nombre}</h3>
        <p>Precio: €${precio}</p>
        <button id="agregarcar" onclick="agregarAlShopcart(${id})">Agregar al carrito</button>
        <div class="confirmacion">Producto agregado al carrito</div>
      </div>
    `;
    productContainer.appendChild(productDiv);
  });
};


//Barra búsqueda:
const barraBusqueda = document.getElementById('barra-busqueda');

barraBusqueda.addEventListener('input', () => {
  const valorBusqueda = barraBusqueda.value.toLowerCase();
  const productosFiltrados = filtrarPorBusqueda(productos, valorBusqueda);
  actualizarVisualizacion(productosFiltrados);
});

const filtrarPorBusqueda = (productos, valorBusqueda) => {
  return productos.filter(
    (producto) =>
      producto.nombre.toLowerCase().includes(valorBusqueda) ||
      producto.extra.toLowerCase().includes(valorBusqueda)
  );
};
///Los próximos cambios a realizar serán los diferentes tipos de filtros y la búsqueda. 