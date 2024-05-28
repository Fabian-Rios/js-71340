const productos = [
    {nombre: "intel i3", precio: 100 },
    {nombre: "intel i5", precio: 180 },
    {nombre: "intel i7", precio: 304 },
    {nombre: "intel i9", precio: 534 },
    {nombre: "ryzen 3", precio: 70},
    {nombre: "ryzen 5", precio: 142},
    {nombre: "ryzen 7", precio: 200},
    {nombre: "ryzen 9", precio: 555},
    {nombre: "Disco rigido 1tp", precio: 60},
    {nombre: "Disco rigido 2tp", precio: 120},
    {nombre: "placa de video asrock rx 6600", precio: 199},
    {nombre: "placa de video asus gtx 1650", precio: 281},
    {nombre: "placa de video asus rtx 4060Ti", precio: 480},
    {nombre: "placa de video asus rx 7600", precio: 379},
    {nombre: "placa de video evga rtx 3090", precio: 1399},
]
let carrito = []

let seleccion = prompt("Hola desea comprar algun producto si o no")

while(seleccion != "si" && seleccion != "no"){
    alert ("por favor ingrese Si o No")
    seleccion = prompt("Hola desea comprar algo Si o No")
}

if(seleccion == "si"){
    alert("A continuación nuestra lista de productos")
    let todoslosProductos = productos.map((producto) => producto.nombre + " " + producto.precio + "$" );
    alert(todoslosProductos.join(" - "));
} else if (seleccion == "no"){
    alert("¡Gracias por venir, vuelva pronto!")
}

while(seleccion != "no"){
    let producto = prompt("agrega un producto al carrito")
    let precio = 0
    
    if(producto == "intel i3" || producto == "intel i5" || producto == "intel i7" || producto == "intel i9" || producto == "ryzen 3" || producto == "ryzen 5" || producto == "ryzen 7" || producto == "ryzen 9" || producto == "Disco rigido 1tp" || producto == "Disco rigido 2tp" || producto == "Placa de video Asrock rx 6600" || producto == "Placa de video Asus GTX 1650" || producto == "Placa de video Asus rx 7600" || producto == "Placa de video Evga RTX 3090"
    ){switch(producto){
        case "intel i3":
        precio = 100
        break;
        case "intel i5":
        precio = 180
        break;
        case "intel i7":
        precio = 304
        break;
        case "intel i9":
        precio = 534
        break;
        case "ryzen 3":
        precio = 74
        break;
        case "ryzen 5":
        precio = 142
        break;
        case "ryzen 7":
        precio = 222
        break;
        case "ryzen 9":
        precio = 555
        break;
        case "Disco rigido 1tp":
        precio = 60
        break;
        case "Disco rigido 2tp":
        precio = 120
        break;
        case "placa de video asrock rx 6600":
        precio = 199
        break;
        case "placa de video asus gtx 1650":
        precio = 281
        break;
        case "placa de video Asus rtx 4060ti":
        precio = 480
        break;
        case "placa de video asus rx 7600":
        precio = 379
        break;
        case "placa de video evga rtx 3090":
        precio = 1399
        break;
        default:
        break;
    }
let unidades = parseInt(prompt("10 unidades como max."))

carrito.push({producto, unidades, precio})
console.log(carrito)
} else {
    alert("No tenemos ese producto")
}
seleccion = prompt("¿Desea continuar comprando?")
while(seleccion == "no"){
    alert("Gracias por la compra!")
    carrito.forEach((carritoFinal) => {
        console.log(`producto: ${carritoFinal.producto}, unidades: ${carrito.unidades}, Total a pagar por producto ${carritoFinal.unidades * carritoFinal.precio}`)
    })
break;
}
}

const total = carrito.reduce((acc, el) => acc + el.precio * el.unidades, 0)
console.log(`el total a pagar por su compra es: ${total}`)

