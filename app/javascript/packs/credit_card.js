// document.addEventListener("turbolinks:load", function() {

// 	PagSeguroDirectPayment.setSessionId(document.querySelector('#session-id').value);


// 	document.querySelector('#card-number').addEventListener('input', getCardInput);

// 	document.querySelectorAll('button').forEach(button => {
// 		button.addEventListener('click', () => {
// 			if (button.id === 'submit-boleto-form') {
// 				sendHashToHiddenInput();
// 				submitForm(button);
// 			}
// 			else if (button.id === 'submit-card-form') {
// 				sendHashToHiddenInput();
// 				sendCardTokenToHiddenInput();
// 				submitForm(button);
// 			}
// 		})
// 	})

// 	// document.querySelector('#submit-card-form').addEventListener('click', function() {
// 	// 	sendHashToHiddenInput();
// 	// 	sendCardTokenToHiddenInput();
// 	// 	submitForm();

// 	// });

// })


// function submitForm(button) {
// 	setTimeout(function() { button.form.submit() }, 2000);
// }


// function getCardInput() {
// 	let cardNumber = document.querySelector('#card-number')
// 	PagSeguroDirectPayment.getBrand({
// 		cardBin: cardNumber.value,
// 		success: function(response) {
// 			console.log(response);
// 			if(response['brand']['cvvSize'] > 0) {
// 				showCvv();
// 				getPaymentOptions(response['brand']['name'], document.querySelector('#price').value);
// 				showPaymentOptions();
// 			}
// 		},
// 		error: function(response) {
// 			console.log(response)
// 		}
// 	})	
// }

// function showCvv() {
// 	document.querySelector('#card-cvv-box').style.display = 'block';
// }

// function getPaymentOptions(flag, price) {
//   PagSeguroDirectPayment.getInstallments({
//     amount: price,
//     brand: flag,
//     success: function(response) {
//       // cardOptions = document.querySelector('#card-options');
//       installments = response['installments'][flag]
//         .forEach(function(value) {
//           option = document.createElement('option');
//           option.textContent = "$"+value['installmentAmount']+" x "+value['quantity']+" - total: $"+value['totalAmount'];
//           option.value = value['quantity'];
//           document.querySelector('#card-options').appendChild(option);
//       })
//     },
//     error: function(response) {
//       console.log(response);
//     },
//     complete: function(response) {
//       console.log(response);
//     }
//   })
// }

// function showPaymentOptions() {
// 	document.querySelector('#card-options-box').style.display = 'block';
// }

// function sendHashToHiddenInput() {
// 	document.querySelector('#sender-hash').value = PagSeguroDirectPayment.getSenderHash();
// }

// function sendCardTokenToHiddenInput() {
// 	var params = {
// 		cardNumber: document.querySelector('#card-number').value, // 4111111111111111 c85440628659073287030@sandbox.pagseguro.com.br
// 		cvv: document.querySelector('#card-cvv').value,
// 		expirationMonth: document.querySelector('#expiration-month').value,
// 		expirationYear: document.querySelector('#expiration-year').value,
// 		success: function(response) {
// 			document.querySelector('#card-token').value = response['card']['token'];
// 		},
// 		error: function(response) {
// 			alert('As informações do cartão estão incorretas.')
// 		}
// 	}
	
// 	PagSeguroDirectPayment.createCardToken(params)
// }

