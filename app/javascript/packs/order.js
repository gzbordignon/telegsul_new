$(document).ready(function() {
	$('#submit-button').click(function(e) {
		e.preventDefault();
			$.ajax({
				type: 'POST',
				url: '/orders.json',
				data: $('#shipping-form').serialize() + '&' + $('#order-form').serialize(),
				dataType: 'json',
				success: function(response) {
					console.log('sucesso' + JSON.stringify(response))
				},
				error: function(response) {
					console.log('erro' + JSON.stringify(response))
				}
			})
	})
})