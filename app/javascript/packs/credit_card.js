document.addEventListener('turbolinks:load', function() {

	creditCardSubmit();

})

function creditCardSubmit() {
	PagSeguroDirectPayment.setSessionId($("#session-id").val());

	document.querySelector('#card-number').addEventListener('input', checkCardNumber)


	$('#credit-card-form').on('submit', function(e) {
		e.preventDefault();

		$('#sender-hash-credit-card').val(PagSeguroDirectPayment.getSenderHash());

		sendCardTokenToHiddenInput();

		setTimeout(function() {
			const shippingForm = $('#shipping-form')
			const creditCardForm = $('#credit-card-form')

			const data = shippingForm.serialize() + "&&" + creditCardForm.serialize()

			$.ajax({
				method: 'POST',
				url: '/orders.json', // isso tá mandando pro format.json
				// url: 'https://telegsul.herokuapp.com/orders.json', // isso tá mandando pro format.json
				data: data,
				dataType: 'json',
				success: function(response) {
					console.log(JSON.stringify(response.payment.errors))
					// setTimeout(function() {
					// 	window.location.href = `/pedido/${response.order.id}`;
					// }, 5000);
					if (response.payment.errors.length > 0) {
						console.log('lol')
						document.querySelector('#submit-card-form').removeAttribute('disabled');
					}
					else {
						console.log('lul')
					}

				},
				error: function(response) {
					console.log('wtf' + JSON.stringify(response));
				}
			})
		}, 5000)



	})
}

function checkCardNumber() {
	PagSeguroDirectPayment.getBrand({
		cardBin: $(this).val(),
		success: function(response) {
			console.log(response);
			if(response['brand']['cvvSize'] > 0) {
				$('#card-cvv-box').show();
				getPaymentOptions(response['brand']['name'], $('#card-price').val());
				$('#card-options-box').show();
			}
		},
		error: function(response) {
			console.log(response)
		}
	})	
}



function getPaymentOptions(flag, price) {
  PagSeguroDirectPayment.getInstallments({
    amount: price,
    brand: flag,
    success: function(response) {
      cardOptions = document.querySelector('#card-options');
      if (cardOptions.hasChildNodes()) {
      	cardOptions.querySelectorAll('option').forEach(option => {
      		option.remove();
      	})
      }
      installments = response['installments'][flag]
        .forEach(function(value) {
          const option = document.createElement('option');
          option.textContent = "R$ " + value['installmentAmount']+" x "+value['quantity']+" - total: R$ "+value['totalAmount'];
          option.value = value['quantity'];
          document.querySelector('#card-options').appendChild(option);
      })
    },
    error: function(response) {
      console.log(response);
    },
    complete: function(response) {
      console.log(response);
    }
  })
}

function sendCardTokenToHiddenInput() {
	const params = {
		cardNumber: $('#card-number').val(), // 4111111111111111 c85440628659073287030@sandbox.pagseguro.com.br
		cvv: $('#card-cvv').val(),
		expirationMonth: $('#expiration-month').val(),
		expirationYear: $('#expiration-year').val(),
		success: function(response) {
			$('#card-token').val(response['card']['token']);
		},
		error: function(response) {
			alert('As informações do cartão estão incorretas.')
		}
	}
	
	PagSeguroDirectPayment.createCardToken(params)
}