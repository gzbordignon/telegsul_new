import React, { useState, useEffect } from "react";
import { currentMonth, months } from "./config/months";
import { currentYear, years } from "./config/years";

const CreditCardPayType = () => {
  const [selectedMonth, setSelectedMonth] = useState(months[currentMonth].name);

  const [selectedYear, setSelectedYear] = useState(currentYear);

  let monthOptions = months.map(month => (
    <option key={month.id} value={month.id}>
      {month.name}
    </option>
  ));

  let yearsOptions = years.map(year => (
    <option key={year} value={year}>
      {year}
    </option>
  ));

  const handleMonthChange = e => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = e => {
    setSelectedYear(e.target.value);
  };

  return (
    <div>
      <form id="credit-card-form" data-action="submit->pagseguro#submitCardForm">
        <input type="hidden" name="sender_hash" data-target="pagseguro.cardSenderHash" />
        <input type="hidden" name="card[card_token]" data-target="pagseguro.cardToken" />
        <input type="hidden" name="pay_type" value="Cartão de crédito"></input>
        <div>
          <label htmlFor="card[card_name]">Nome do titular</label>
          <br />
          <input type="text" name="card[card_name]" />
        </div>
        <div>
          <label htmlFor="card[card_document]">CPF/CNPJ do titular</label>
          <br />
          <input type="text" name="card[card_document]" />
        </div>
        <div>
          <label htmlFor="card[card_number]">Número do cartão</label>
          <br />
          <input
            type="text"
            name="card[card_number]"
            data-target="pagseguro.cardNumber"
            data-action="input->pagseguro#checkCard"
          />
        </div>
        <div>
          <label htmlFor="expiration_date">Validade</label>
          <br />
          <select
            name="card[expiration_month]"
            value={selectedMonth}
            onChange={handleMonthChange}
            data-target="pagseguro.cardExpirationMonth">
            {monthOptions}
          </select>
          <select
            name="card[expiration_year]"
            value={selectedYear}
            onChange={handleYearChange}
            data-target="pagseguro.cardExpirationYear">
            {yearsOptions}
          </select>
        </div>
        <div data-target="pagseguro.cardCvvBox" style={{ display: "none" }}>
          <label htmlFor="card[card_cvv]">Código de segurança</label>
          <br />
          <input type="text" name="card[card_cvv]" data-target="pagseguro.cardCvv" />
        </div>
        <div data-target="pagseguro.cardOptionsBox" style={{ display: "none" }}>
          <label htmlFor="card[card_options]">Opções de parcelamento</label>
          <br />
          <select name="card[card_options]" data-target="pagseguro.cardOptions"></select>
        </div>
        <div>
          <button type="submit">Finalizar pedido</button>
        </div>
      </form>
    </div>
  );
};

export default CreditCardPayType;
