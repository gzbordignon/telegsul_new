document.addEventListener('turbolinks:load', function() {
	
	$('#document-types-form').find('input').change(function() {
		// $('#payment-methods').trigger('reset');
		// $('#credit-card-form').trigger('reset');
		if ($(this).is(':checked') && $(this).val() === 'fisica') {
			$('#cnpj-form-container').hide();
			$('#cpf-form-container').show();
		}
		else {
			$('#cpf-form-container').hide();
			$('#cnpj-form-container').show();
		}
	})

})