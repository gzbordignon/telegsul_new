$(document).ready(function() {

	$('#boleto-form').on('submit', function(e) {
	// $('#submit-boleto-form').click(function() {
		e.preventDefault();

		$('#sender-hash-boleto').val(PagSeguroDirectPayment.getSenderHash());

		const shippingForm = $('#shipping-form').serialize();
		const boletoForm = $('#boleto-form').serialize();
		

		$.ajax({
			method: 'POST',
			// url: '/orders.json', // isso tá mandando pro format.json
			url: 'http://telegsul.herokuapp.com/orders.json', // isso tá mandando pro format.json
			data: shippingForm + "&&" + boletoForm,
			dataType: 'json',
			success: function(response) {
				console.log(JSON.stringify(response.order.id));
				console.log(JSON.stringify(response));
				setTimeout(function() {
					window.location.href = `/pedido/${response.order.id}/boleto`;
				}, 3000);
			},
			error: function(response) {
				console.log('wtf' + JSON.stringify(response));

			}
		})

	})

})