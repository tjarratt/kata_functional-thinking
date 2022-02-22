// This file needs some refactoring...

import { Data } from './app/Data.js';
import { Dom } from './app/Dom.js';

let cart = Data.cart;
let freeShippingThreshold = Data.FREE_SHIPPING_THRESHOLD;

// This function is the entry point of this feature.
// It is called when a user clicks on an item to add it to the cart.
// You have to keep the `export` keyword as it creates a bridge with the UI,
// but feel free to change whatever you feel needs to be changed inside the function.
export function addToCart(name, price) {
  cart.push({ name, price });

  let cartTotal = calculateCartTotal();
  let shippingCost = cartTotal >= freeShippingThreshold ? 0 : Data.SHIPPING_COST;

  updateCardTotalDom(cartTotal);
  updateTaxDom(cartTotal);
  updateShippingDom(shippingCost);
  updateShippingIcons(cartTotal, shippingCost);
}

function calculateCartTotal() {
  let cartTotal = 0;

  for (let i = 0; i < cart.length; i++) {
    cartTotal += cart[i].price;
  }

  return cartTotal;
}

function updateTaxDom(total) {
  Dom.updateTax(total * data.TAX_RATE);
}

function updateShippingDom(shippingCost) {
  Dom.updateShipping(shippingCost);
}

function updateShippingIcons(cartTotal, shippingCost) {
  let items = Dom.getItems();

  if (shippingCost === 0) {
    Dom.hideAllFreeShippingIcons();

    return;
  }

  for (let i = 0; i < items.length; i++) {
    let item = items[i];

    if (item.price + cartTotal >= freeShippingThreshold) {
      Dom.showFreeShippingIconFor(item);
    }
  }
}

function updateCardTotalDom(value) {
  Dom.updateCartTotal(value);
}


