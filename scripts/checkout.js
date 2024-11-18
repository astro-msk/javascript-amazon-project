import {cart, removeFromCart} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let itemHTML = '';

cart.forEach( item => {
  let curProduct;
  let productID = item.productID;

  products.forEach( product => {
    if (productID === product.id){
      curProduct = product;
    }
  });

  itemHTML += `
    <div class="cart-item-container">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${curProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${curProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(curProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: 
              <span class="quantity-label">
              ${item.quantity}
              </span>
            </span>
            <span class="update-quantity-link link-primary js-update-button">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-button data-product-id=${productID}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${productID}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${productID}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${productID}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;  
});

document.querySelector('.js-order-summary').innerHTML = itemHTML;

document.querySelectorAll('.js-delete-button').forEach( link => {
  link.addEventListener('click', () => {
    const productID = link.dataset.productId;
    removeFromCart(productID);
  });
});