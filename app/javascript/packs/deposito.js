document.addEventListener('turbolinks:load', function() {

	$('#deposito-form').on('submit', function(e) {
	// $('#submit-boleto-form').click(function() {
		e.preventDefault();

		$('#sender-hash-deposito').val(PagSeguroDirectPayment.getSenderHash());

		const shippingForm = $('#shipping-form').serialize();
		const depositoForm = $('#deposito-form').serialize();
		
		const data = shippingForm + "&&" + depositoForm;

		$.ajax({
			method: 'POST',
			url: '/orders.json', // isso tá mandando pro format.json
			// url: 'https://telegsul.herokuapp.com/orders.json', // isso tá mandando pro format.json
			data: data,
			dataType: 'json',
			success: function(response) {
				console.log(JSON.stringify(response));
				// setTimeout(function() {
				// 	window.location.href = `/pedido/${response.order.id}/boleto`;
				// }, 3000);
			},
			error: function(response) {
				console.log('wtf' + JSON.stringify(response));

			}
		})

	})

})