const grande = document.querySelector(".carrousel_img")
const punto  = document.querySelectorAll(".punto")

punto.forEach((cadaPunto , i) =>{
    punto[i].addEventListener("click", ()=>{

        let posicion = i
        let calc = posicion * -33.3333333333

        grande.style.transform = `translateX(${calc}%)`

        punto.forEach((cadaPunto, i) =>{
            punto[i].classList.remove("activo")
        })
        punto[i].classList.add("activo")
    })
})