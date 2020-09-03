import React, { useState, useReducer } from "react";

const BoletoPayType = () => {
  return (
    <div>
      <form data-action="submit->pagseguro#submitBoletoForm">
        <input
          type="hidden"
          name="boleto[sender_hash]"
          data-target="pagseguro.boletoSenderHash"></input>
        <input type="hidden" name="order[pay_type]" value="Boleto"></input>
        <button type="submit">Finalizar pedido</button>
      </form>
    </div>
  );
};

export default BoletoPayType;
