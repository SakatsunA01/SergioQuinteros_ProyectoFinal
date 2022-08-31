//Saco las remeras desde un json con fetch
fetch("../data.json")
    .then((respuesta) => respuesta.json())
    .then((data) =>{
        let contenedorProductos = document.getElementById("productos")                 //Selecciono el contenedor para dibujar los productos previamente recuperados el JSON
        for (const remera of data.remeras) {
            let boxRemera = document.createElement("div")                              //creamos el contenedor para dibujarlo
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
        
        //leemos los botones con la clase "agregar"
        let comprar = document.getElementsByClassName("agregar")
        //cada boton apretado, ejecuta la funcion "agregar al carrito"
        for (let i = 0; i < comprar.length; i++) {
            comprar[i].addEventListener("click", agregarAlCarrito)
        }

         
        let carritoDeCompra = []        //este array lo declaro para guardar localmente los productos comprados
            
        function agregarAlCarrito(a){
            let productoParaCarrito = data.remeras.find(remera => remera.id == a.target.id)         //esta variable se encarga de ver cual boton se apreto
            let cantidadUnidades = document.getElementById("input"+productoParaCarrito.id).value    //con esta leemos la cantidad de prodcutos seleccionados en el input

            if (cantidadUnidades >= productoParaCarrito.stock) {                                    //este if se encuentra para evitar compras sin cantidad de unidades especificadas o negativas
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

            } else {                                                                //si la compra es valida, guarda esta dentro del array previamente declarado como "carritoDeCompra"
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

            localStorage.setItem("compras", JSON.stringify(carritoDeCompra))        //guardamos localmente nuestra compra
        }
    })