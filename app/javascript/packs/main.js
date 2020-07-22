// document.addEventListener("turbolinks:load", function() {
// 	const paymentTypes = document.querySelector('#payment-types');
// 	const inputs = paymentTypes.querySelectorAll('input');
// 	inputs.forEach(input => {
// 		input.addEventListener('click', function(e) {
// 			if (e.target.id === 'boleto') {
// 				boletoForm = document.querySelector('#boleto-form');
// 				hideForms();
// 				boletoForm.style.display = 'block';
// 				document.querySelector('#pay-type-boleto').value = document.querySelector('#boleto').value
// 				document.querySelector('#pay-type-card').removeAttribute('value')
// 			}
// 			else if (e.target.id === 'credit-card') {
// 				creditCard = document.querySelector('#card-form');
// 				hideForms();
// 				creditCard.style.display = 'block';
// 				document.querySelector('#pay-type-card').value = document.querySelector('#credit-card').value
// 				document.querySelector('#pay-type-boleto').removeAttribute('value')
// 			}
// 			else {
// 				hideForms();
// 			}
// 		})
// 	})
// });

// function hideForms() {
// 	forms = document.querySelectorAll('form');
// 	forms.forEach(form => {
// 		if (form.id !== 'payment-types') {
// 			form.style.display = 'none';
// 		}
// 	})
// }
