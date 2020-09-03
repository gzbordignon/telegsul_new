import React, { useState, useReducer } from "react";
import NoPayType from "./NoPayType";
import BoletoPayType from "./BoletoPayType";
import CreditCardPayType from "./CreditCardPayType";

const PayTypeSelector = () => {
  const [selectedPayType, setSelectedPayType] = useState("");

  const handleChange = e => {
    setSelectedPayType(e.target.value);
  };

  let PayTypeCustomComponent = NoPayType;

  if (selectedPayType == "boleto") {
    PayTypeCustomComponent = BoletoPayType;
  } else if (selectedPayType == "credit_card") {
    PayTypeCustomComponent = CreditCardPayType;
  }

  return (
    <div>
      <form data-target="pagseguro.paymentMethodsForm">
        <div>
          <img src="" alt="" data-target="pagseguro.paymentImgTag" />
          <label>Boleto</label>
          <input
            type="radio"
            name="pay_type"
            value="boleto"
            checked={selectedPayType === "boleto"}
            onChange={handleChange}
          />
        </div>
        <div>
          <img src="" alt="" data-target="pagseguro.paymentImgTag" />
          <label>Cartão de crédito</label>
          <input
            type="radio"
            name="pay_type"
            value="credit_card"
            checked={selectedPayType === "credit_card"}
            onChange={handleChange}
          />
        </div>
      </form>
      <PayTypeCustomComponent />
    </div>
  );
};

export default PayTypeSelector;
