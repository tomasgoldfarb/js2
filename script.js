const productos = [
    {
        modelo: "A20",
        marca: "Ainner",
        precio: 50000,
        img: "img/gallery01.jpg",
    },
    {
        modelo: "A30",
        marca: "Ainner",
        precio: 52000,
        img: "img/gallery02.jpg",
    },
    {
        modelo: "S10",
        marca: "Snauwaert",
        precio: 60000,
        img: "img/gallery03.jpg",
    },
    {
        modelo: "S20",
        marca: "Snauwaert",
        precio: 62000,
        img: "img/gallery04.jpg",
    },
    {
        modelo: "S30",
        marca: "Snauwaert",
        precio: 65000,
        img: "img/gallery05.jpg",
    },
    {
        modelo: "S40",
        marca: "Snauwaert",
        precio: 68000,
        img: "img/gallery06.jpg",
    },
];

const carrito = [];

const contenedor = document.getElementById("contenedorProductos");

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

    function agregarAlCarrito() {
        carrito.push(boton)
        console.log(carrito)

        let json_transformar = JSON.stringify(carrito);
        sessionStorage.setItem("carrito", json_transformar);
    }

    function mostrarCarrito() {
        if (JSON.parse(sessionStorage.getItem("carrito"))) {
            carritoEnUso = JSON.parse(sessionStorage.getItem("carrito"))
            console.log(carritoEnUso)
        }

    }
    //mostrarCarrito();
})


