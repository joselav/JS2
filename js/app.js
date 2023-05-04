///PÁGINA PRODUCTOS

let productos = [];
const productContainer = document.querySelector('#product-container');
const shopcart = [];
let totalShopcart = 0;
let totalItems = 0;

// Para obtener los datos de data.json
fetch('/json/data.json')
  .then(response => response.json())
  .then(data => {
    productos = data.productos;

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
        const confirmacion = card.querySelector('.confirmacion');

        button.addEventListener('click', function() {
          confirmacion.style.display = 'block';// Mostrar el mensaje de confirmación
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

        card.addEventListener("pointerleave", function(){
          confirmacion.style.display = 'none';
        })

  });
      });
  
  })
  .catch(error => console.error('Error al obtener los datos del archivo JSON', error));


  
  

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
};

//Vaciar el carrito
const vaciarShopcart = () => {
  shopcart.splice(0, shopcart.length);
  totalShopcart = 0;
  totalItems = 0;
  actualizarShopcart();
  actualizarTotal();
  actualizarTotalProd();
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
    alert("El carrito está vacío. Por favor, agrega al menos un item para continuar.");
  } else {
    alert('Gracias por confiar en nosotros, su compra ha sido finalizada.');
  }
};



///Los próximos cambios a realizar serán el Loader, los diferentes tipos de filtros y la búsqueda. 