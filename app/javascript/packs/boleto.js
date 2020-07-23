// $(document).ready(function() {
// 	PagSeguroDirectPayment.setSessionId($("#session_id").val());

// 	$('#boleto-form').on('submit', function(e) {
// 		e.preventDefault();

// 		$('#sender-hash').val(PagSeguroDirectPayment.getSenderHash());

// 		console.log($(this).serialize());

// 		dados = $(this).serialize();

// 		$.ajax({
// 			method: 'POST',
// 			url: '/tests.json', // dps tem que mudar pra url + payments/new
// 			data: dados,
// 			dataType: 'json',
// 			success: function(response) {
// 				console.log(JSON.stringify(response.payment_link));
// 				$('#payment-link').attr('href', response.payment_link);
// 			},
// 			error: function(response) {
// 				console.log('wtf' + JSON.stringify(response));

// 			}
// 		})

// 	})

// })

// pega o link do boleto como resposta

// $(document).ready(function() {
// 	PagSeguroDirectPayment.setSessionId($("#session_id").val());

// 	$('#boleto-form').on('submit', function(e) {
// 	// $('#submit-boleto-form').click(function() {
// 		e.preventDefault();

// 		$('#sender-hash').val(PagSeguroDirectPayment.getSenderHash());


// 		const boletoForm = $('#boleto-form').serialize();
// 		const shippingForm = $('#shipping-form').serialize();


// 		$.ajax({
// 			method: 'POST',
// 			url: '/orders.json', // isso tá mandando pro format.json
// 			data: shippingForm + "&&" + boletoForm,
// 			dataType: 'json',
// 			success: function(response) {
// 				// console.log(JSON.stringify(response.payment_link));
				
// 				// $('#boleto-form').hide();
// 				// const boletoLink = $('#boleto-link');
// 				// boletoLink.attr('href', response.payment_link);
// 				// boletoLink.click(function() {
// 				// 	setTimeout(function() {
// 				// 		window.location.href = "/";
// 				// 	}, 3000);
					
// 				// })


// 			},
// 			error: function(response) {
// 				console.log('wtf' + JSON.stringify(response));

// 			}
// 		})

// 	})

// })


$(document).ready(function() {
	PagSeguroDirectPayment.setSessionId($("#session_id").val());

	$('#boleto-form').on('submit', function(e) {
	// $('#submit-boleto-form').click(function() {
		e.preventDefault();

		$('#sender-hash').val(PagSeguroDirectPayment.getSenderHash());


		const boletoForm = $('#boleto-form').serialize();
		const shippingForm = $('#shipping-form').serialize();


		$.ajax({
			method: 'POST',
			url: '/orders.json', // isso tá mandando pro format.json
			data: shippingForm + "&&" + boletoForm,
			dataType: 'json',
			success: function(response) {
				console.log(JSON.stringify(response.order.id));
				setTimeout(function() {
					window.location.href = `/orders/${response.order.id}`;
				}, 3000);
				


			},
			error: function(response) {
				console.log('wtf' + JSON.stringify(response));

			}
		})

	})

})