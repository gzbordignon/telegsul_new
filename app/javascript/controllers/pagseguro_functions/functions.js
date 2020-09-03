import Rails from "@rails/ujs";

const getSenderHash = senderHashInput => {
  senderHashInput.value = PagSeguroDirectPayment.getSenderHash();
};

const getPaymentMethods = (form, imgTags) => {
  PagSeguroDirectPayment.getPaymentMethods({
    success: res => {
      // console.log(res);
      const url = "https://stc.pagseguro.uol.com.br/";
      const boletoImage = res.paymentMethods.BOLETO.options.BOLETO.images.SMALL.path;
      const cardImage = res.paymentMethods.CREDIT_CARD.options.MASTERCARD.images.SMALL.path;
      const transferImage = res.paymentMethods.ONLINE_DEBIT.options.ITAU.images.SMALL.path;
      const paymentMethodsImages = [boletoImage, cardImage, transferImage];
      for (let [i, val] of paymentMethodsImages.entries()) {
        imgTags[i].setAttribute("src", url + val);
      }
    },
    error: res => {
      // Callback para chamadas que falharam.
    },
    complete: res => {
      // Callback para todas chamadas.
    },
  });
};

const sendFormDataToController = formData => {
  Rails.ajax({
    type: "POST",
    url: "/orders.json",
    data: formData,
    dataType: "json",
    success: function (response) {
      console.log(response);
      // window.location.href = `/pedido/${response.order.id}/boleto`;
    },
    error: function (response) {
      console.log(response);
    },
  });
};

export { sendFormDataToController, getSenderHash, getPaymentMethods };
