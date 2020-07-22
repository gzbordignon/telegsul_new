$(document).ready(function() {
	PagSeguroDirectPayment.setSessionId($("#session_id").val());

	$('#boleto-form').on('submit', function(e) {
		e.preventDefault();

		$('#sender-hash').val(PagSeguroDirectPayment.getSenderHash());

		console.log($(this).serialize());

		dados = $(this).serialize();

		$.ajax({
			method: 'POST',
			url: '/tests.json', // dps tem que mudar pra url + payments/new
			data: dados,
			dataType: 'json',
			success: function(response) {
				console.log(JSON.stringify(response.payment_link));
				$('#payment-link').attr('href', response.payment_link);
			},
			error: function(response) {
				console.log('wtf' + JSON.stringify(response));

			}
		})

	})

})