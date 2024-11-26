import {cart, removeFromCart, updateDeliveryOption} from '../data/cart.js';
import { products } from '../data/products.js';
import formatCurrency from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from '../data/deliveryOptions.js';


function renderOrderSummary() {

  let itemHTML = '';

  cart.forEach( item => {
    let curProduct;
    let productID = item.productID;

    products.forEach( product => {
      if (productID === product.id){
        curProduct = product;
      }
    });

    let deliveryString = '';

    deliveryOptions.forEach( deliveryOption => {
      if( item.deliveryOptionId === deliveryOption.id ){
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        deliveryString = deliveryDate.format('dddd, MMMM D');
      }
    });

    itemHTML += `
      <div class="cart-item-container js-cart-item-container-${productID}">
        <div class="delivery-date">
          Delivery date: ${deliveryString}
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
              <span class="delete-quantity-link link-primary js-delete-button" data-product-id="${productID}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML (productID, item)}
          </div>
        </div>
      </div>
    `;  
  });
  
  document.querySelector('.js-order-summary').innerHTML = itemHTML;

  function deliveryOptionsHTML (productID, cartItem){
    let doHTML = '';

    deliveryOptions.forEach( deliveryOption => {

      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const deliveryString = deliveryDate.format('dddd, MMMM D');
      const priceString = deliveryOption.priceCents === 0 ? 'FREE Shipping' : `$${formatCurrency(deliveryOption.priceCents)} - Shipping` ;
      const isChecked = cartItem.deliveryOptionId === deliveryOption.id;

      doHTML += `
        <div class="delivery-option js-delivery-option" data-product-id="${productID}" data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
            ${ isChecked ? 'checked' : '' }
            class="delivery-option-input"
            name="delivery-option-${productID}">
          <div>
            <div class="delivery-option-date">
              ${deliveryString}
            </div>
            <div class="delivery-option-price">
              ${priceString}
            </div>
          </div>
        </div>
      `;
    });

    return doHTML;
  }


  document.querySelectorAll('.js-delete-button').forEach( link => {
    
    link.addEventListener('click', () => {
      const productID = link.dataset.productId;
      removeFromCart(productID);

      const container = document.querySelector(`.js-cart-item-container-${productID}`);
      container.remove();
    });

  });

  document.querySelectorAll('.js-delivery-option').forEach( element => {
    element.addEventListener('click', () => {
      updateDeliveryOption(element.dataset.productId, element.dataset.deliveryOptionId);
      renderOrderSummary();
    })
  });

}

renderOrderSummary();