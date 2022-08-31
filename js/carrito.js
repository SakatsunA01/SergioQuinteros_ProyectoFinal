let carrito_compra = JSON.parse(localStorage.getItem("compras"))        //Recuperamos los datos guardados localmente 
let contenedorCompras = document.getElementById("carrito")              //Seleccionamos donde dibujar los productos comprados
let sumaCompra = []                                                     //Declaro una variable para cada producto seleccionado con su precio ya multiplicado por unidad
var totalCompra = 0                                                     //Variable para guardar el total de la compra



for (const item of carrito_compra){                                     //Dibujamos nuestra compra en el html
    let precioPorCantidad = item.precio * item.cantidadUnidades         //Multiplico el precio por la cantidad de unidades
    let tbody = document.createElement("tbody")
        tbody.innerHTML =`
        <td>
            <div class="carrito_producto_box">
                <img src=".${item.img}" alt="imagen de una remera">
                <p>${item.nombreProducto}</p>
            </div>    
        </td>
        <td>${item.cantidadUnidades}</td>
        <td>$${precioPorCantidad}</td>
        `
        contenedorCompras.append(tbody)
    
    sumaCompra.push(precioPorCantidad)                                  //Agrego el tiem comprado al array "sumaCompra" para posteriormente sumarlo y dar un total 
}


for (let ia = 0; ia < sumaCompra.length; ia++) {                        //Recorro el array y sumo sus items a "totalCopra" para tener un resultado
    totalCompra += sumaCompra[ia] 
}


function mostarTotal(){                                                 //Dibujo el precio total, para mostarle al usuario dentro del html
    let totalCont = document.getElementById("carrito_total")
    let totalMostar = document.createElement("div")
    totalMostar.innerHTML = `
    <h3>Total de la compra</h3>
    <p>${totalCompra}</p>
    `
    totalCont.append(totalMostar)
}
mostarTotal()



let carrito_borrar = document.getElementById("btn_borrar")              //Selecciono el boton borrar
carrito_borrar.addEventListener("click", borrarLista)                   //Cuando se seleccione el boton, ejecuta la funcion "borrar lista"

function borrarLista(){                                                 //Le pedimos una pequeña confirmacion al usuario en forma de alert, para borrar la lista
    Swal.fire({
        title: '¿Estas seguro que quieres borrar el carrito?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Borrar',
        denyButtonText: `No Borrar`,
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.clear()                                          //Como la lista se recupera del localstorage, borramos este
        } else if (result.isDenied) {
          console.log("ª")
        }
      })
}