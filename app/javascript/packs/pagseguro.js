$(document).ready(function() {
    PagSeguroDirectPayment.setSessionId($("#session-id").val());

    PagSeguroDirectPayment.getPaymentMethods({
        success: function(response) {
            console.log(response)
            const url = 'https://stc.pagseguro.uol.com.br/'
            const boletoImage = response.paymentMethods.BOLETO.options.BOLETO.images.SMALL.path
            const cardImage = response.paymentMethods.CREDIT_CARD.options.MASTERCARD.images.SMALL.path
            const transferImage = response.paymentMethods.ONLINE_DEBIT.options.ITAU.images.SMALL.path
            const form = document.querySelector('#payment-methods');
            const imgs = form.querySelectorAll('img');
            const array = [boletoImage, cardImage, transferImage];
            for (let [i, val] of array.entries()) {
                imgs[i].setAttribute('src', url + val)
            }
        },
        error: function(response) {
            // Callback para chamadas que falharam.
        },
        complete: function(response) {
            // Callback para todas chamadas.
        }
    });
})

