import React from "react";

class TeleShippingMethod extends React.Component {
  render() {
    return (
      <div>
        <form data-target="pagseguro--card.shippingForm">
          <input
            type="hidden"
            value="false"
            name="shipping"
            data-target="shipping.shipping_bolean"></input>
          <input type="text" name="order[shipping_address_attributes][street]"></input>
          <input type="text" name="order[shipping_address_attributes][number]"></input>
          <input type="text" name="order[shipping_address_attributes][complement]"></input>
          <input type="text" name="order[shipping_address_attributes][district]"></input>
          <input type="text" name="order[shipping_address_attributes][postal_code]"></input>
          <input type="text" name="order[shipping_address_attributes][city]"></input>
          <button type="submit">Enviar</button>
        </form>
      </div>
    );
  }
}

export default TeleShippingMethod;
