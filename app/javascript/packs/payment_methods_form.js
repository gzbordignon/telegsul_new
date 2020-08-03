document.addEventListener('turbolinks:load', function() {
	$('#payment-methods').find('input').change(function() {
		if ($(this).is(':checked') && $(this).val() === 'Boleto') {
			$('#credit-card-form-container').hide();
			$('#deposito-form-container').hide();
			$('#boleto-form-container').show();
		}
		else if ($(this).is(':checked') && $(this).val() === 'Cartão de crédito') {
			$('#boleto-form-container').hide();
			$('#deposito-form-container').hide();
			$('#credit-card-form-container').show();
		}
		else if ($(this).is(':checked') && $(this).val() === 'Depósito') {
			console.log($(this).val())
			$('#boleto-form-container').hide();
			$('#credit-card-form-container').hide();
			$('#deposito-form-container').show();
		}
	})
})

