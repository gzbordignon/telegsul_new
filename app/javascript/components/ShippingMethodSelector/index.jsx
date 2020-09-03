import React, { useState } from "react";
import NoShippingMethod from "./NoShippingMethod";
import TeleShippingMethod from "./TeleShippingMethod";

const ShippingMethodSelector = () => {
  const [selectedShippingMethod, setSelectedShippingMethod] = useState("local");

  const handleChange = e => {
    setSelectedShippingMethod(e.target.value);
  };

  let ShippingMethodCustomComponent = NoShippingMethod;

  if (selectedShippingMethod == "local") {
    ShippingMethodCustomComponent = NoShippingMethod;
  } else if (selectedShippingMethod == "tele") {
    ShippingMethodCustomComponent = TeleShippingMethod;
  }

  return (
    <div>
      <form>
        <label>Retirar no local</label>
        <input
          type="radio"
          name="shipping_method"
          value="local"
          data-action="change->shipping#handleChange"
          checked={selectedShippingMethod === "local"}
          onChange={handleChange}></input>

        <label>Tele-entrega</label>
        <input
          type="radio"
          name="shipping_method"
          value="tele"
          data-action="change->shipping#handleChange"
          checked={selectedShippingMethod === "tele"}
          onChange={handleChange}></input>
      </form>
      <div>
        <ShippingMethodCustomComponent />
      </div>
    </div>
  );
};

export default ShippingMethodSelector;
