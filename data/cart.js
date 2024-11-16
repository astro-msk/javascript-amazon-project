export const cart = [
  
];


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
      quantity: 1
    });
  }
}