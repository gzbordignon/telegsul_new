$(document).ready(function() {
	// frete radio buttons
	$('#frete-form').find('input').change(function() {
		if ($(this).is(':checked') && $(this).val() === 'tele') {
			$('#shipping-form').show();
			$('#shipping').val(true)
		}
		else {
			$('#shipping-form').hide();
			$('#shipping').val(false)
		}
	})

	// payment radio buttons
	$('#payment-methods').find('input').change(function() {
		if ($(this).is(':checked') && $(this).val() === 'boleto') {
			$('#card-form').hide();
			$('#boleto-form').show();
		}
		else if ($(this).is(':checked') && $(this).val() === 'credit_card') {
			$('#boleto-form').hide();
			$('#card-form').show();
		}
	})
})