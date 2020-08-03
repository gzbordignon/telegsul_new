document.addEventListener('turbolinks:load', function() {

	PagSeguroDirectPayment.setSessionId($("#session-id").val());

	$('#card-number').on('keyup', checkCardNumber);



	$('#credit-card-form').on('submit', function(e) {
		e.preventDefault();

		$('#sender-hash-credit-card').val(PagSeguroDirectPayment.getSenderHash());

		sendCardTokenToHiddenInput();

		const shippingForm = $('#shipping-form');
		const creditCardForm = $('#credit-card-form');

		const data = shippingForm.serialize() + "&&" + creditCardForm.serialize()

		setTimeout(function() {
			$.ajax({
				method: 'POST',
				url: '/orders.json', // isso tá mandando pro format.json
				// url: 'https://telegsul.herokuapp.com/orders.json', // isso tá mandando pro format.json
				data: data,
				dataType: 'json',
				success: function(response) {
					console.log(JSON.stringify(response))
					// console.log(JSON.stringify(response.order.id));
					console.log(JSON.stringify(response));
					setTimeout(function() {
						window.location.href = `/pedido/${response.order.id}`;
					}, 5000);
				},
				error: function(response) {
					console.log('wtf' + JSON.stringify(response));
				}
			})
		}, 3000)

	})
})


function checkCardNumber() {
	PagSeguroDirectPayment.getBrand({
		cardBin: $(this).val(),
		success: function(response) {
			console.log(response);
			if(response['brand']['cvvSize'] > 0) {
				$('#card-cvv-box').show();
				getPaymentOptions(response['brand']['name'], $('#price').val());
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
      // cardOptions = document.querySelector('#card-options');
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