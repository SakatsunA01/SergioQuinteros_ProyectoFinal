fetch("../data.json")
    .then((respuesta) => respuesta.json())
    .then((data) =>{
        let contenedorProductos = document.getElementById("productos")
            for (const remera of data.remeras) {
                let img = document.createElement("img")
                img.src = remera.imgurl
                let boxRemera = document.createElement("div")
                boxRemera.className = "producto_box"
                boxRemera.innerHTML = `
                <img src="${remera.imgurl}" alt="imagen de una remera">
                <h3>${remera.nombre}</h3>
                <p>$${remera.precio}</p>
                <p>quedan: ${remera.stock} unidades</p>
                <div class="numeros">
                    <span>Unidades a comprar:</span>
                    <input type=number id=input${remera.id} class="numeros_input">
                </div>
                <button class="agregar" id="${remera.id}">Comprar</button>
                `
                contenedorProductos.append(boxRemera)
            }
            let comprar = document.getElementsByClassName("agregar")

            for (let i = 0; i < comprar.length; i++) {
                comprar[i].addEventListener("click", agregarAlCarrito)
            }
            let carritoDeCompra = []
            
            function agregarAlCarrito(a){
                let productoParaCarrito = data.remeras.find(remera => remera.id == a.target.id)
                let cantidadUnidades = document.getElementById("input"+productoParaCarrito.id).value

                if (cantidadUnidades >= productoParaCarrito.stock) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Su compra supera el stock!',
                      })
                }else if(cantidadUnidades === ""){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No se especifico la cantidad de unidades',
                      })
                }else if(cantidadUnidades <= -1){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No se pudo realizar la compra!',
                      })
                } else {
                    Toastify({
                        text: "Agregado Al Carrito",
                        duration: 3000,
                        style: {
                            background: "linear-gradient(to right, #2B4865, #8FE3CF)",
                          }
                    }).showToast()

                    carritoDeCompra.push(
                        {nombreProducto:productoParaCarrito.nombre, precio: productoParaCarrito.precio, cantidadUnidades:cantidadUnidades, img:productoParaCarrito.imgurl}
                    )
                }
                localStorage.setItem("compras", JSON.stringify(carritoDeCompra))
            }
    })