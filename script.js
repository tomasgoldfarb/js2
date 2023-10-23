const URL = "productos.json"

const carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];

const contenedor = document.getElementById("contenedorProductos");

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
pedirProductos();
mostrarCarrito();