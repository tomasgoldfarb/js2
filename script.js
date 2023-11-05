const URL = "productos.json"

const carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];

const contenedor = document.getElementById("contenedorProductos");

const botonComprar = document.createElement("button");
botonComprar.innerHTML = `<button type="button" class="btn btn-primary">Comprar</button>`
botonComprar.addEventListener("click", comprar);
document.body.appendChild(botonComprar);

const botonVaciarCarrito = document.createElement("button");
botonVaciarCarrito.innerHTML = `<button type="button" class="btn btn-primary">Vaciar carrito</button>`
botonVaciarCarrito.addEventListener("click", vaciarCarrito);
document.body.appendChild(botonVaciarCarrito);

const pedirProductos = async () => {
    const respuesta = await fetch(URL)
    const productos = await respuesta.json()

    productos.forEach((producto) => {
        let contenedorIndividual = document.createElement("div")

        contenedorIndividual.innerHTML = `<div class="card" style="width: 18rem;">
<img src="${producto.img}" class="card-img-top" alt="...">
<div class="card-body">
  <h5 class="card-title">${producto.marca}</h5>
  <p class="card-text">Modelo: ${producto.modelo}</p>
  <p class="card-text">Precio: ${producto.precio}</p>
  <button id="agregar${producto.modelo}" type="button" class="btn btn-primary">Agregar al carrito</button>
</div>
</div>`

        contenedor.appendChild(contenedorIndividual)

        let boton = document.getElementById(`agregar${producto.modelo}`);
        boton.addEventListener("click", agregarAlCarrito)
        boton.addEventListener("click", () => {
            Swal.fire({
                icon: 'success',
                title: 'Producto agregado',
                text: 'El producto fue agregado a tu carrito',
            })
        })
    })
    function agregarAlCarrito(event) {
        const productId = event.target.id.replace("agregar", "");
        const producto = productos.find((p) => p.modelo === productId);
        carrito.push(producto);
        console.log(carrito);

        let json_transformar = JSON.stringify(carrito);
        sessionStorage.setItem("carrito", json_transformar);
        mostrarCarrito();
    }
}

function mostrarCarrito() {

    const carritoEnUso = JSON.parse(sessionStorage.getItem("carrito"))

    const contenedorCarrito = document.getElementById("contenedorCarrito")

    let cartHTML = '';

    if (carritoEnUso && carritoEnUso.length > 0) {

        cartHTML += '<h3>Carrito de Compras</h3>';
        cartHTML += '<ul>';
        carritoEnUso.forEach((producto) => {
            cartHTML += `<li>${producto.marca} - ${producto.modelo} - Precio: $${producto.precio}</li>`;
        });
        cartHTML += '</ul>';
    } else {

        cartHTML = '<p>El carrito está vacío.</p>';
    }

    contenedorCarrito.innerHTML = cartHTML;
}
function vaciarCarrito() {
    Swal.fire({
        title: '¿Estás seguro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí!',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            sessionStorage.removeItem("carrito");
            carrito.length = 0;
            mostrarCarrito();
            Swal.fire(
                'Tu carrito ha sido borrado',
                'Podés volver a iniciar tu proceso de compra.',
                'success'
            )
        }
    })
}
function comprar() {
    Swal.fire({
        title: '¿Confirmás la compra?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí!',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            sessionStorage.removeItem("carrito");
            carrito.length = 0;
            mostrarCarrito();
            Swal.fire(
                'Tu pedido ha sido enviado',
                'Te llegará un e-mail con los detalles de tu pedido.',
                'success'
            )
        }
    })
}
pedirProductos();
mostrarCarrito();