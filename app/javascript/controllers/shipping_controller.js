import { Controller } from "stimulus";
import React from "react";
import ReactDOM from "react-dom";
import ShippingMethodSelector from "../components/ShippingMethodSelector";
import { updateCartTotal } from "./shipping_functions/functions";

export default class extends Controller {
  static targets = ["cartId", "cartTotal"];
  connect() {
    const cartId = this.cartIdTarget.value;
    const cartTotalTd = document.querySelector("#cart-total");
    const cartTotal = this.cartTotalTarget;
    updateCartTotal(cartId, undefined, cartTotalTd, cartTotal);

    ReactDOM.render(
      <ShippingMethodSelector />,
      document.querySelector("#shipping-method-selector")
    );
  }
  handleChange(e) {
    const cartId = this.cartIdTarget.value;
    const cartTotalTd = document.querySelector("#cart-total");
    const cartTotal = this.cartTotalTarget;
    let data;

    if (e.target.value === "tele") {
      data = "cart[frete]=true";
      updateCartTotal(cartId, data, cartTotalTd, cartTotal);
    } else {
      updateCartTotal(cartId, undefined, cartTotalTd, cartTotal);
    }
  }
}
