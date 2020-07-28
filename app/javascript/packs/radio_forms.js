$(document).ready(function() {
	const price = document.querySelector('#price');
	const priceValue = price.value;
	// frete radio buttons
	$('#frete-form').find('input').change(function() {
		$('#payment-methods').trigger('reset');
		$('#credit-card-form').trigger('reset');
		if ($(this).is(':checked') && $(this).val() === 'tele') {
			$('#shipping-form-container').show();
			$('#shipping').val(true)
			price.value = parseFloat((parseFloat(price.value) + 10.0)).toFixed(2);
		}
		else {
			$('#shipping-form-container').hide();
			$('#shipping').val(false)
			price.value = priceValue;
		}
	})

	// payment radio buttons
	$('#payment-methods').find('input').change(function() {
		if ($(this).is(':checked') && $(this).val() === 'Boleto') {
			$('#credit-card-form-container').hide();
			$('#boleto-form-container').show();
		}
		else if ($(this).is(':checked') && $(this).val() === 'Cartão de crédito') {
			$('#boleto-form-container').hide();
			$('#credit-card-form-container').show();
		}
	})
})

