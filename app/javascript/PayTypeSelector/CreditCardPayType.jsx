import React from 'react'

class CreditCardPayType extends React.Component {
  render() {
    return (
      <form action="/orders">
        {/* Hidden inputs */}
        <div>
          <input type="hidden" name="price" value=`${@cart.total_price}`></input> 
        </div>
        <fieldset>
         <legend>Informações</legend>
          <div className="field">
            <label htmlFor="card_name">Nome do Titular</label>
            <input type="text" name="card_name" id="card-name" />
          </div>
          <div>
          </div>
          <div className="field">
            <label htmlFor="card_number">Card Number</label>
            <input type="text" name="card_number" id="card-number" />
          </div>
          <div className="field">
            <label htmlFor="expiration_month">Expiry</label>
            <select name="expiration_month" id="expiration-month">
              <option value="01">Janeiro</option>
            </select>
          </div>  
          <div className="field">
            <label htmlFor="expiration_year">Expiry</label>
            <select name="expiration_year" id="expiration-year">
              <option value="2020">2020</option>
            </select>
          </div>
          <div id="card-cvv-box">
            <div className="field">
              <label htmlFor="card_cvv">CVV</label>
              <input type="text" name="card_cvv" id="card-cvv" />
            </div> 
          </div>
          <div id="card-options-box">
            <div className="field">
              <label htmlFor="card_options">Parcelamento</label>
              <select name="card_options" id="card-options" >
              </select>
            </div>
          </div>
        {/* Button*/}
          <div>
            <button type="button" id="buy-button">Finalizar pagamento</button>
          </div>
        </fieldset>
      </form>
    );
  }
}
export default CreditCardPayType