import React from 'react'

class CreditCardPayType extends React.Component {
  render() {
    return (
      <div>
        <div className="field">
          <label htmlFor="card_name">Nome do Titular</label>
          <input type="text" name="card_name" id="card-name" />
        </div>
        <div>
        </div>
        <div className="field">
          <label htmlFor="order_credit_card_number">Card Number</label>
          <input type="password" name="order[credit_card_number]" id="order_credit_card_number" />
        </div>

        <div className="field">
          <label htmlFor="expiration_month">Expiry</label>
          <select name="expiration_month" id="expiration-month">
            <option value="1">Janeiro</option>
          </select>
        </div>     
      </div>
    );
  }
}
export default CreditCardPayType