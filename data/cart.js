export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [
  {
    productID:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 1,
    deliveryOptionId: '1'
  },
  {
    productID:"83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    quantity: 3,
    deliveryOptionId: '2'
  },
];
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productID){
  let checkItem = true;
  cart.forEach( cartItem => {
    if (productID === cartItem.productID) {
      cartItem.quantity += 1;
      checkItem = false;
    }
  });

  if (checkItem) {
    cart.push({
      productID: productID,
      quantity: 1,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();

}

export function removeFromCart(productID){
  const newCart = [];
  cart.forEach( item => {
    if(item.productID !== productID) {
      newCart.push(item);
    }
  });
  cart = newCart;

  saveToStorage();

}