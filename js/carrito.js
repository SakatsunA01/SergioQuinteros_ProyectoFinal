let carrito_compra = JSON.parse(localStorage.getItem("compras"))
let contenedorCompras = document.getElementById("carrito")
let sumaCompra = []
var totalCompra = 0

for (const item of carrito_compra){
    let precioPorCantidad = item.precio * item.cantidadUnidades
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
    
    sumaCompra.push(precioPorCantidad)
}


for (let ia = 0; ia < sumaCompra.length; ia++) {
    totalCompra += sumaCompra[ia] 
}

function mostarTotal(){
    let totalCont = document.getElementById("carrito_total")
    let totalMostar = document.createElement("div")
    totalMostar.innerHTML = `
    <h3>Total de la compra</h3>
    <p>${totalCompra}</p>
    `
    totalCont.append(totalMostar)
}
mostarTotal()



let carrito_borrar = document.getElementById("btn_borrar")
carrito_borrar.addEventListener("click", borrarLista)

function borrarLista(){
    Swal.fire({
        title: '¿Estas seguro que quieres borrar el carrito?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Borrar',
        denyButtonText: `No Borrar`,
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.clear()
        } else if (result.isDenied) {
          console.log("ª")
        }
      })
}