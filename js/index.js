const Swal = new Swalstrap();

const Clickbutton = document.querySelectorAll('.button')

const tbody = document.querySelector('.tbody')


let carrito = []


Clickbutton.forEach(btn => {
  btn.addEventListener('click', addToCarritoItem)
})


function addToCarritoItem(e) {
  const button = e.target
  const item = button.closest('.card')
  const itemTitle = item.querySelector('.card-title').textContent;
  const itemPrice = item.querySelector('.precio').textContent;
  const itemImg = item.querySelector('.card-img-top').src;
  let response = prompt("Ha seleccionado " + itemTitle + "\n¿Desea añadirlo al carrito?");
  if (response == null) {
    console.log("El usuario ha cancelado la compra");
  }
  else if (response != null && response != "si") {
    alert("Confirme la compra\nEscriba si para añadir al carrito")
  }
  else {
    const newItem = {
      title: itemTitle,
      precio: itemPrice,
      img: itemImg,
      cantidad: 1
    }
    addItemCarrito(newItem)
  }
}


function addItemCarrito(newItem) {
  // const alert = document.querySelector('.alert');

  // setTimeout(function () {
  //   alert.classList.add('hide')
  // }, 2000)
  // alert.classList.remove('hide')

  Swal.fire({
    icon: 'success',
    title: 'Genial!',
    text: 'Producto Añadido al carrito!'
  })

  // muestra el icono
  document.querySelector('.swal-bs-icon-container .icon').attributes.removeNamedItem('hidden')

  const InputElemnto = tbody.getElementsByClassName('input_elemento')
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].title === newItem.title) {
      carrito[i].cantidad++;
      const inputValue = InputElemnto[i]
      inputValue.value++;
      CarritoTotal()
      return null;
    }
  }
  carrito.push(newItem)
  renderCarrito()
}


function renderCarrito() {
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


function CarritoTotal() {
  let Total = 0;
  const itemCartTotal = document.querySelector('.itemCartTotal');
  carrito.forEach((item) => {
    const precio = Number(item.precio.replace("$", ''));
    Total = Total + precio * item.cantidad;
  })
  itemCartTotal.innerHTML = "Total $" + Total;
}



function removeItemCarrito(e) {
  const buttonDelete = e.target
  const tr = buttonDelete.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  for (let i = 0; i < carrito.length; i++) {

    if (carrito[i].title.trim() === title.trim()) {
      carrito.splice(i, 1)
    }
  }

  // const alert = document.querySelector('.remove')

  // setTimeout(function () {
  //   alert.classList.add('remove')
  // }, 2000)
  // alert.classList.remove('remove')

  Swal.fire({
    icon: 'success',
    title: 'Genial!',
    text: 'Producto removido!'
  })

  // muestra el icono
  document.querySelector('.swal-bs-icon-container .icon').attributes.removeNamedItem('hidden')

  tr.remove()
  CarritoTotal()
}


function addLocalStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function () {
  const storage = JSON.parse(localStorage.getItem('carrito'));
  if (storage) {
    carrito = storage;
    renderCarrito()
  }
}