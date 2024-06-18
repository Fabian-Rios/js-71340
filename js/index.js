//Creo una constante para seleccionar todos los elementos en el DOM que tienen la clase button
const Clickbutton = document.querySelectorAll('.button')

//Creo otra constante para seleccionar el elemento que tiene la clase tbody
//que será la parte de la tabla donde mostraré el carrito
const tbody = document.querySelector('.tbody')

//Creo una variable para mi carrito que será un array vacío que iré llenando
//a medida que se van realizando las compras.
let carrito = []

//Añado manejadores de eventos a cada uno de los botones
//seleccionados previamente con la clase button
Clickbutton.forEach(btn => {
btn.addEventListener('click', addToCarritoItem)
})

//Creo la funcion que es llamada cada vez que se hace click sobre cada botón
//1 button es una constante es la que captura el evento del botón seleccionado
//2 item captura el elemento del DOM que tiene la clase card, es el div de cada producto
//3 itemTitle guarda el texto contenido dentro del elemento con la clase card-title
//4 itemPrice guarda el texto contenido dentro del elemento con la clase precio
//5 itemImg guarda el enlace (src) dentro del elemento con la clase card-img-top 
//6 la variable response guarda la respuesta del usuario al prompt, 
//si le da a cancelar response será = null y la ventana se cerrará, 
//si no escribe nada o pone algo diferente a si, saldrá un alert indicando que debe introducir si para continuar la compra. 
//Si el usuario introduce si correctamente, se procederá a crear un objeto NewItem con la cantidad 1 por defecto
//7 LLamo a la funcion addItemCarrito enviando el objeto creado
function addToCarritoItem(e){
    const button = e.target
    const item = button.closest('.card')
    const itemTitle = item.querySelector('.card-title').textContent;
    const itemPrice = item.querySelector('.precio').textContent;
    const itemImg = item.querySelector('.card-img-top').src;
    let response = prompt("Ha seleccionado " + itemTitle + "\n¿Desea añadirlo al carrito?");
    if (response == null){
      console.log("El usuario ha cancelado la compra");
    }
    else if (response != null && response != "si"){
      alert("Confirme la compra\nEscriba si para añadir al carrito")
    }
    else{
      const newItem = {
        title: itemTitle,
        precio: itemPrice,
        img: itemImg,
        cantidad: 1
      }
      addItemCarrito(newItem)
    }
}

//1 Creo una variable para seleccionar el elemento con la clase alert
//2 Llamo a la función setTimeout que se encarga de mostrar la alerta con la clase hide
//y luego ocultarla después de 2 segundos (2000 milisegundos)
//3 Selecciono todos los elementos dentro de tbody que tienen la clase input_elemento
//y los guarda en InputElemnto
//4 Utilizo un bucle for para iterar sobre el array carrito y comparar el título el newItem
//con los que ya hay guardados dentro del array carrito. Si encontrara que ya está ese artículo
//aumentará la cantidad de unidades y llamo a la función CarritoTotal para actualizar el precio
//si el artículo ha sido encontrado hago un return null para salir de la función y no continuar
//5 si el bucle anterior no encontró coinciencia es que es un artículo nuevo, por lo que debo
//añadirlo al array carrito, para eso hago un carrito.push enviandole el newItem como argumento
//6 hago una recarga de datos en pantalla con la función renderCarrito()
function addItemCarrito(newItem){
  const alert = document.querySelector('.alert');
  
  setTimeout( function(){
    alert.classList.add('hide')
  }, 2000)
    alert.classList.remove('hide')

  const InputElemnto = tbody.getElementsByClassName('input_elemento')
  for(let i =0; i < carrito.length ; i++){
    if(carrito[i].title === newItem.title){
    carrito[i].cantidad ++;
    const inputValue = InputElemnto[i]
    inputValue.value++;
    CarritoTotal()
    return null;
  }
  }
  carrito.push(newItem)
  renderCarrito()
} 

//1 Vacío el contenido del elemento tbody para que no haya elementos duplicados
//renderizar el carrito de nuevo
//2 Utiliza el método map para iterar sobre cada item en el array carrito.
//https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map
//3 Creo un elemento de fila de tabla (tr) y le añado la clase ItemCarrito.
//4 Creo cadena de texto (template string literals) que contiene el contenido HTML para la fila:
//https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Template_literals
//Celda de encabezado (th) con el valor vacío.
//Celda de datos (td) que contiene la imagen y el título del producto.
//Celda de datos que muestra el precio del producto.
//Celda de datos que contiene un input para cambiar la cantidad y un botón de eliminación.
//5 Asigno el contenido HTML definido anteriormente a la fila tr
//6 Añado la fila tr al elemento tbody en el DOM.
//https://developer.mozilla.org/es/docs/Web/API/Element/append
//7 Selecciono el botón con la clase delete dentro de la fila tr y le añade un manejador de
//eventos para el evento click que llama a la función removeItemCarrito.
//8 Selecciono el input con la clase input_elemento dentro de la fila tr y le añade un
//manejador de eventos para el evento change que llama a la función sumaCantidad.
//9 Llamo a la función CarritoTotal para actualizar el precio total de las compras
function renderCarrito(){
    tbody.innerHTML = ''
    carrito.map(item => {
    const tr = document.createElement('tr')
    tr.classList.add('ItemCarrito')
    const Content = `
    
    <th scope="row"></th>
            <td class="table_productos">
            <img src=${item.img}  alt="">
            <h6 class="title">${item.title}</h6>
            </td>
            <td class="table_price"><p>${item.precio}</p></td>
            <td class="table_cantidad">
            <input type="number" min="1" value=${item.cantidad} class="input_elemento">
            <button class="delete btn btn-danger">x</button>
            </td>
    
    `
    tr.innerHTML = Content;
    tbody.append(tr)

    tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
    tr.querySelector(".input_elemento").addEventListener('change', sumaCantidad)
  })
  CarritoTotal()
}

//1 Creo una variable con valor 0 como inicio del precio total del carrito
//2 Selecciono el elemento con la clase itemCartTotal con el que mostraré el total
//3 Itero sobre cada elemento en el array carrito y extraigo el precio (representado con un
//signo de paso $) y lo convierte a un número utilizando Number(). 
//Esto elimina el símbolo $ y convierte el valor restante en un número.
//4 Multiplic0 el precio por la cantidad de ese artículo (item.cantidad) y lo suma al total
// acumulado (Total).
//5 Actualizo el contenido HTML del elemento itemCartTotal para mostrar el total del 
//carrito formateado como texto.
function CarritoTotal(){
  let Total = 0;
  const itemCartTotal = document.querySelector('.itemCartTotal');
  carrito.forEach((item) => {
    const precio = Number(item.precio.replace("$", ''));
    Total = Total + precio*item.cantidad;
  })
  itemCartTotal.innerHTML = "Total $" + Total;
}


//1 Detecto el elemento que desencadenó el evento (click en este caso) en el botón de eliminar
//2 Utilizo closest() para encontrar el elemento ascendente más cercano que tenga la clase
//ItemCarrito. Que es la fila de la tabla (<tr>) que contiene el artículo en el carrito
//que se va a eliminar.
//https://developer.mozilla.org/es/docs/Web/API/Element/closest
//3 Accedo al elemento dentro de la fila (tr) que tiene la clase title y obtiene su contenido
//que es el título del artículo que se va a eliminar.
//4 Recorro el array carrito para encontrar el artículo que tenga el mismo título que el
// artículo que se está eliminando (title).
//Utiliza splice() para eliminar el artículo del array carrito en la posición i.
//https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
//5 Vuelvo a mostrar una alerta como la anterior pero con un mensaje nuevo avisando de que
//se ha eliminado un artículo del carrito
//6 Elimino la fila (tr) del DOM que contiene el artículo que se está eliminando.
//7 Vuelvo a calcular el precio total del carrito llamando a la función CarritoTotal
function removeItemCarrito(e){
    const buttonDelete = e.target
    const tr = buttonDelete.closest(".ItemCarrito")
    const title = tr.querySelector('.title').textContent;
    for(let i=0; i<carrito.length ; i++){ 

    if(carrito[i].title.trim() === title.trim()){
    carrito.splice(i, 1)
    }
}

  const alert = document.querySelector('.remove')

  setTimeout( function(){
    alert.classList.add('remove')
  }, 2000)
    alert.classList.remove('remove')

  tr.remove()
  CarritoTotal()
}

//1 Capturo el input del evento
//2 Busco el elemento mas cercano con la clase ItemCarrito
//3 Obtengo el título del artículo seleccionado
//4 Itero sobre el array carrito para actualizar la cantidad
//Verifica si el valor del input (sumaInput.value) es menor que 1. 
//Si es así, establece el valor del input en 1 para evitar cantidades negativas o cero.
//Actualizo la propiedad cantidad del objeto item en el array carrito con el nuevo valor.
//Llama a la función CarritoTotal() para recalcular y actualizar el total.
function sumaCantidad(e){
  const sumaInput  = e.target
  const tr = sumaInput.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  carrito.forEach(item => {
    if(item.title.trim() === title){
      sumaInput.value < 1 ?  (sumaInput.value = 1) : sumaInput.value;
      item.cantidad = sumaInput.value;
      CarritoTotal()
    }
  })
}