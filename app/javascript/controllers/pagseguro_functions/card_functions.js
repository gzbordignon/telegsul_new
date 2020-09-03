const getCardToken = (
  cardTokenInput,
  cardNum,
  cardCvv,
  cardExpirationMonth,
  cardExpirationYear
) => {
  PagSeguroDirectPayment.createCardToken({
    cardNumber: "4111111111111111",
    cvv: "123",
    expirationMonth: "12",
    expirationYear: "2030",
    success: res => {
      console.log("card token: " + res["card"]["token"]);
      cardTokenInput.value = res["card"]["token"];
    },
    error: res => {
      console.log(res);
    },
  });
};

const getPaymentOptions = (flag, price, element) => {
  PagSeguroDirectPayment.getInstallments({
    amount: price,
    brand: flag,
    success: res => {
      console.log(res.installments);
      appendInstallmentsOptions(res["installments"][flag], element);
    },
    error: res => {
      console.log(res);
    },
  });
};

const appendInstallmentsOptions = (installments, element) => {
  installments.forEach(installment => {
    const option = document.createElement("option");
    option.textContent = `R$ ${installment["installmentAmount"]} x ${installment["quantity"]} - total: R$ ${installment["totalAmount"]}`;
    option.value = installment["quantity"];
    element.appendChild(option);
  });
};

const removeInstallmentsOptions = element => {
  if (element.hasChildNodes()) {
    element.querySelectorAll("option").forEach(option => {
      option.remove();
    });
  }
};

export { getCardToken, getPaymentOptions, removeInstallmentsOptions };
