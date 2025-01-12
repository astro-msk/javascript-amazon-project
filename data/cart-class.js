class Cart{
  cartItems;
  #localStorageKey;

  constructor(localStorageKey){
    this.#localStorageKey = localStorageKey;
    this.loadFromStorage();
  }

  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
  
    if (!this.cartItems) {
      this.cartItems = [
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
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productID){
    let checkItem = true;
    this.cartItems.forEach( cartItem => {
      if (productID === cartItem.productID) {
        cartItem.quantity += 1;
        checkItem = false;
      }
    });
    if (checkItem) {
      this.cartItems.push({
        productID: productID,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }
    this.saveToStorage();
  }

  removeFromCart(productID){
    const newCart = [];
    this.cartItems.forEach( item => {
      if(item.productID !== productID) {
        newCart.push(item);
      }
    });
    this.cartItems = newCart;
    this.saveToStorage();
  }

  updateDeliveryOption(productID, deliveryOptionId) {

    let matchingItem;
  
    this.cartItems.forEach( cartItem => {
      if (productID === cartItem.productID) {
        matchingItem = cartItem;
      }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  }

}

const cart = new Cart('cart-oop');
const businessCart = new Cart('business-cart-oop');

console.log(cart);
console.log(businessCart);