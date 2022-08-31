const grande = document.querySelector(".carrousel_img")         //Seleccionamos todas las imagenes
const punto  = document.querySelectorAll(".punto")              //Y todos los puntos

punto.forEach((cadaPunto , i) =>{                               //Leemos la posicion de cada punto
    punto[i].addEventListener("click", ()=>{

        let posicion = i
        let calc = posicion * -33.3333333333                    //La posicion se multiplica por la cantidad de imagenes dividio en 100%, posicion 0*33.33..= 0 y consecuentemente

        grande.style.transform = `translateX(${calc}%)`         //La imagen que corresponda al punto, se le transalada el resultado del calculo anterior

        punto.forEach((cadaPunto, i) =>{
            punto[i].classList.remove("activo")                 //Borramos todas las clases "activo", que le da estilo para mostar el boton selecionado
        })
        punto[i].classList.add("activo")                        //le agregamos la clase al boton seleccionado
    })
})