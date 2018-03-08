function drawProducts(data) {
  let products = data.products;
  let productsContainer = document.getElementById("products-container");
  products.forEach((product, index) => {
    let productHTML = createProductHTML(product);
    productsContainer.appendChild(productHTML);
  });
}

function createProductHTML(product) {
  let template = `
    <h3>${product.title}</h3>
    <img src='${product.imageUrl}' alt='${product.description}'/>
    <p>${product.description}</p>
    <button data-product-id=${product.id}
      onclick="addToCart(this,${product.id})"
      class='btn btn-primary'>
        Agregar a carrito
      </button>
    <hr/>
  `;
  let productContainer = document.createElement("div");
  productContainer.className = "col text-center";
  productContainer.innerHTML = template;
  return productContainer;
}

drawProducts(data);

function addToCart(eventTrigger, ItemID) {
  if (eventTrigger.classList.contains('clicked') === false) {
    increaseCounter(eventTrigger);
    changeButtonStatus(false, eventTrigger);
    addProduct(ItemID)
  } else if (eventTrigger.classList.contains('clicked') === true) {
    decreaseCounter(eventTrigger);
    changeButtonStatus(true, eventTrigger);
    deleteProduct(ItemID)
  }
}


shoppingCart = [];



function addProduct(productId) {
  (data.products).forEach(product => {
    if (productId === product.id) {
      shoppingCart.push(product);
    }
  });
  // console.log(shoppingCart);
  saveShoppingCart();
}


function deleteProduct(productId) {
  shoppingCart = shoppingCart.filter(function (item) {
    return item.id !== productId
  })
  // console.log(shoppingCart);
  saveShoppingCart();
}

function increaseCounter(eventTrigger) {
  eventTrigger.classList.toggle('clicked')
  const counter = document.getElementById('counterItems');
  let counterNumber = parseInt(document.getElementById('counterItems').textContent);
  counterNumber += 1
  saveCounter(counterNumber);
  counter.innerHTML = counterNumber;
 
}

function decreaseCounter(eventTrigger) {
  eventTrigger.classList.toggle('clicked')
  const counter = document.getElementById('counterItems');
  let counterNumber = parseInt(document.getElementById('counterItems').textContent);
  counterNumber -= 1
  saveCounter(counterNumber);
  counter.innerHTML = counterNumber;
}

function changeButtonStatus(condition, eventTrigger) {
  if (condition === true) {
    eventTrigger.textContent = 'Agregar al carrito';
  } else if (condition === false) {
    eventTrigger.textContent = 'Quitar del carrito';
  }
}

function saveShoppingCart() {
  localStorage.setItem("shoppingCartLS", JSON.stringify(shoppingCart));

}

function saveCounter (counterNumber) {
  localStorage.setItem("firstCounter",counterNumber );
}

