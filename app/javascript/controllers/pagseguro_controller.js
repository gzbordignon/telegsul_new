import { Controller } from "stimulus";
import {
  sendFormDataToController,
  getSenderHash,
  getPaymentMethods,
} from "./pagseguro_functions/functions";
import {
  getCardToken,
  getPaymentOptions,
  removeInstallmentsOptions,
} from "./pagseguro_functions/card_functions";
import serialize from "form-serialize";

export default class extends Controller {
  static targets = [
    "sessionId",
    "boletoSenderHash",
    "cardSenderHash",
    "cardToken",
    "cardNumber",
    "cardCvv",
    "cardCvvBox",
    "cartTotal",
    "cardOptions",
    "cardOptionsBox",
    "cardExpirationMonth",
    "cardExpirationYear",
    "shippingForm",
    "paymentMethodsForm",
    "paymentImgTag",
  ];

  connect() {
    PagSeguroDirectPayment.setSessionId(this.sessionIdTarget.value);
    setTimeout(() => {
      const paymentMethodsForm = this.paymentMethodsFormTarget;
      const paymentImgTags = this.paymentImgTagTargets;
      getPaymentMethods(paymentMethodsForm, paymentImgTags);
    }, 3000);
  }

  checkCard(e) {
    const cardCvvBox = this.cardCvvBoxTarget;
    const cartTotal = this.cartTotalTarget.value;
    const cardOptions = this.cardOptionsTarget;
    const cardOptionsBox = this.cardOptionsBoxTarget;
    PagSeguroDirectPayment.getBrand({
      cardBin: e.target.value,
      success: res => {
        console.log(res);
        if (res["brand"]["cvvSize"] > 0) {
          cardCvvBox.style.display = "block";
          removeInstallmentsOptions(cardOptions);
          getPaymentOptions(res["brand"]["name"], cartTotal, cardOptions);
          cardOptionsBox.style.display = "block";
        }
      },
      error: res => {
        console.log(res);
        cardCvvBox.style.display = "none";
        cardOptionsBox.style.display = "none";
        removeInstallmentsOptions(cardOptions);
      },
    });
  }

  submitBoletoForm(e) {
    e.preventDefault();
    let data;
    const boletoSenderHashInput = this.boletoSenderHashTarget;
    const hasShippingForm = this.hasShippingFormTarget;
    const boletoForm = e.target;

    getSenderHash(boletoSenderHashInput);

    setTimeout(() => {
      if (hasShippingForm) {
        data = serialize(this.shippingFormTarget) + "&&" + serialize(boletoForm);
      } else {
        data = serialize(boletoForm);
      }
      sendFormDataToController(data);
    }, 3000);
  }

  submitCardForm(e) {
    e.preventDefault();
    let data;
    const cardSenderHashInput = this.cardSenderHashTarget;
    const cardTokenInput = this.cardTokenTarget;
    const cardNumber = this.cardNumberTarget.value;
    const cardCvv = this.cardCvvTarget.value;
    const cardExpirationMonth = this.cardExpirationMonthTarget.value;
    const cardExpirationYear = this.cardExpirationYearTarget.value;
    const cardForm = e.target;
    const hasShippingForm = this.hasShippingFormTarget;

    getSenderHash(cardSenderHashInput);
    getCardToken(cardTokenInput, cardNumber, cardCvv, cardExpirationMonth, cardExpirationYear);

    setTimeout(() => {
      if (hasShippingForm) {
        data = serialize(this.shippingFormTarget) + "&&" + serialize(cardForm);
      } else {
        data = serialize(cardForm);
      }
      sendFormDataToController(data);
    }, 3000);
  }
}
