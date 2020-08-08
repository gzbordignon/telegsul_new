import { numberToBRL } from './functions.js';


document.addEventListener('turbolinks:load', function() {
	var cartTotal = document.querySelector('#cart-total');
	var cartId = document.querySelector('#cart-id').value;
	var cardPrice = document.querySelector('#card-price');


	$.ajax({
		method: 'PATCH',
		url: `/carrinho/${cartId}.json`,
		data: { cart: { frete: false } },
		success: function(response) {
			cartTotal.innerHTML = numberToBRL(response)
			cardPrice.value = response;
		},
		error: function(response) {
			console.log(response)
		}
	})

	

	$('#frete-form').find('input').change(function() {
		$('#payment-methods').trigger('reset');
		$('#credit-card-form').trigger('reset');
		$('#credit-card-form-container').hide();
		$('#boleto-form-container').hide();
		$('#deposito-form-container').hide();

		// const cardOptions = document.querySelector('#card-options');

		// if (cardOptions.hasChildNodes()) {
		// 	cardOptions.querySelectorAll('option').forEach(option => {
		// 		option.remove();
		// 	})
		// }

		if ($(this).is(':checked') && $(this).val() === 'tele') {
			$('#shipping-form-container').show();
			$('#shipping').val(true);

			$.ajax({
				method: 'PATCH',
				url: `/carrinho/${cartId}.json`,
				data: { cart: { frete: true } },
				success: function(response) {
					console.log(response)
					cartTotal.innerHTML = numberToBRL(response)
					cardPrice.value = response;
				},
				error: function(response) {
					console.log(response)
				}
			})

			const tdName = document.createElement('td');
			const tdPrice = document.createElement('td');
			const tr = document.createElement('tr');
			tr.classList.add('frete-tr');
			const cartTable = document.querySelector('#cart-table');
			const tbody = cartTable.querySelector('tbody');
			tbody.appendChild(tr);
			tr.appendChild(tdName);
			tr.appendChild(tdPrice);
			tdName.innerHTML = '+ Frete';
			tdPrice.innerHTML = 'R$ 10,00'

		}
		else if ($(this).is(':checked') && $(this).val() === 'local') {
			$('#shipping-form-container').hide();
			$('#shipping').val(false)


			$.ajax({
				method: 'PATCH',
				url: `/carrinho/${cartId}.json`,
				data: { cart: { frete: false } },
				success: function(response) {
					console.log(response)
					cartTotal.innerHTML = numberToBRL(response)
					cardPrice.value = response;
				},
				error: function(response) {
					console.log(response)
				}
			})

			const tr = document.querySelector('.frete-tr');
			tr.remove()


		}
	})






})

// function numberToBRL(number) {
// 	const formatter = new Intl.NumberFormat('pt-BR', {
//   	style: 'currency',
//   	currency: 'BRL'
// 	});	

// 	return formatter.format(number)
// }
// document.addEventListener('turbolinks:load', function() {
// 	const creditCardForm = document.querySelector('#credit-card-form');
// 	const price = creditCardForm.querySelector('#price');
// 	const noFretePrice = price.value;
// 	let currentPriceValue = price.value;
// 	const cartTotal = document.querySelector('#all-line-items-price');
// 	$('#frete-form').find('input').change(function() {
// 		$('#payment-methods').trigger('reset');
// 		$('#credit-card-form').trigger('reset');
// 		if ($(this).is(':checked') && $(this).val() === 'tele') {
// 			$('#shipping-form-container').show();
// 			$('#shipping').val(true)
// 			currentPriceValue = parseFloat((parseFloat(price.value) + 10.0)).toFixed(2);
// 			cartTotal.innerHTML = numberToBRL(parseFloat(currentPriceValue));
// 			const tdName = document.createElement('td');
// 			const tdPrice = document.createElement('td');
// 			const tr = document.createElement('tr');
// 			tr.classList.add('frete-tr');
// 			const cartTable = document.querySelector('#cart-table');
// 			const tbody = cartTable.querySelector('tbody');
// 			tbody.appendChild(tr);
// 			tr.appendChild(tdName);
// 			tr.appendChild(tdPrice);
// 			tdName.innerHTML = '+ Frete';
// 			tdPrice.innerHTML = 'R$ 10,00'

// 		}
// 		else if ($(this).is(':checked') && $(this).val() === 'local') {
// 			$('#shipping-form-container').hide();
// 			$('#shipping').val(false)
// 			cartTotal.innerHTML = numberToBRL(parseFloat(noFretePrice));
// 			const tr = document.querySelector('.frete-tr');
// 			tr.remove()


// 		}
// 	})
// })

// function numberToBRL(number) {
// 	const formatter = new Intl.NumberFormat('pt-BR', {
//   	style: 'currency',
//   	currency: 'BRL'
// 	});	

// 	return formatter.format(number)
// }
