const contenedor = document.getElementById("productos-container");
const carritoLista = document.getElementById("carrito-lista");
const totalCarrito = document.getElementById("carrito-total");
const contadorCarrito = document.getElementById("contador-carrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

fetch('../js/productos.json')
  .then(res => res.json())
  .then(productos => {
    productos.forEach(producto => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio}</p>
        <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
      `;
      contenedor.appendChild(card);
    });
  });

function agregarAlCarrito(id) {
  fetch('../js/productos.json')
    .then(res => res.json())
    .then(productos => {
      const producto = productos.find(p => p.id === id);
      const index = carrito.findIndex(p => p.id === id);

      if (index !== -1) {
        carrito[index].cantidad += 1;
      } else {
        producto.cantidad = 1;
        carrito.push(producto);
      }

      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderizarCarrito();
    });
}

function renderizarCarrito() {
  carritoLista.innerHTML = "";
  let total = 0;
  let contador = 0;

  carrito.forEach((item, index) => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;
    contador += item.cantidad;

    const li = document.createElement("li");
    li.innerHTML = `
        <div class="item-carrito">
            <div class="item-info">
            <strong>${item.nombre}</strong>
            <p>Precio: $${item.precio}</p>
            <p>
                Cantidad:
                <input type="number" min="1" value="${item.cantidad}" onchange="cambiarCantidad(${index}, this.value)">
            </p>
            <p>Subtotal: $${subtotal}</p>
            </div>
            <button class="btn-eliminar" onclick="eliminarProducto(${index})">Eliminar</button>
        </div>
    `;
    carritoLista.appendChild(li);
  });

  totalCarrito.textContent = total;
  contadorCarrito.textContent = contador;
}

function cambiarCantidad(index, nuevaCantidad) {
  nuevaCantidad = parseInt(nuevaCantidad);
  if (nuevaCantidad > 0) {
    carrito[index].cantidad = nuevaCantidad;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
  }
}

function eliminarProducto(index) {
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderizarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderizarCarrito();
}

function finalizarCompra() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  alert("¡Gracias por tu compra! Te estaremos contactando.");
  carrito = [];
  localStorage.removeItem("carrito");
  renderizarCarrito();
}

renderizarCarrito();


  