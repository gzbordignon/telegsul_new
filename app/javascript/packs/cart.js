$(document).ready(function() {
	const increaseButtons = document.querySelectorAll('.increase');
	const decreaseButtons = document.querySelectorAll('.decrease');
	const deleteButtons = document.querySelectorAll('.delete');

	decreaseLineItemQty(decreaseButtons)
	increaseLineItemQty(increaseButtons)
	deleteLineItem(deleteButtons);

})

function numberToBRL(number) {
	const formatter = new Intl.NumberFormat('pt-BR', {
  	style: 'currency',
  	currency: 'BRL'
	});	

	return formatter.format(number)
}



function increaseLineItemQty(button) {
	button.forEach(submit => {
		submit.addEventListener("click", function(e) {
			e.preventDefault();

			const lineItemQtyHiddenInput = e.target.parentNode.parentNode.querySelector('input[name="line_item_quantity"]')
			lineItemQtyHiddenInput.value = parseInt(lineItemQtyHiddenInput.value) + 1
			const lineItemId = e.target.parentNode.parentNode.querySelector('input[name="id"]').value
			const lineItemPrice = e.target.parentNode.parentNode.querySelector('input[name="price"]').value
			const lineItemTotalPriceHiddenInput = e.target.parentNode.parentNode.querySelector('input[name="line_item_total_price"]')
			const lineItemTotalPrice = document.querySelector(`#line-item-total-price-${lineItemId}`)
			const cartTotal = document.querySelector('#all-line-items-price');
			
			updateLineItem(lineItemQtyHiddenInput, lineItemId, lineItemPrice, lineItemTotalPriceHiddenInput, lineItemTotalPrice, cartTotal)	


		})

	})
}

function getLineItemTotalPrice(lineItemQty, lineItemPrice) {
	return (parseInt(lineItemQty) * parseFloat(lineItemPrice).toFixed(2)).toFixed(2)
}

function addLineItemsTotalPriceToArray(allLineItemsTotalPriceInputs) {
	 	let lineItemsTotalPriceArray = []
	 	allLineItemsTotalPriceInputs.forEach(item => {
	 		lineItemsTotalPriceArray.push(parseFloat(item.value))
	 	})
	 	return lineItemsTotalPriceArray
}


function decreaseLineItemQty(button) {
	button.forEach(submit => {
		submit.addEventListener("click", function(e) {
			e.preventDefault();

			const lineItemQtyHiddenInput = e.target.parentNode.parentNode.querySelector('input[name="line_item_quantity"]')

			if (lineItemQtyHiddenInput.value > 1) {
				lineItemQtyHiddenInput.value = parseInt(lineItemQtyHiddenInput.value) - 1
				const lineItemId = e.target.parentNode.parentNode.querySelector('input[name="id"]').value
				const lineItemPrice = e.target.parentNode.parentNode.querySelector('input[name="price"]').value
				const lineItemTotalPriceHiddenInput = e.target.parentNode.parentNode.querySelector('input[name="line_item_total_price"]')
				const lineItemTotalPrice = document.querySelector(`#line-item-total-price-${lineItemId}`)
				const cartTotal = document.querySelector('#all-line-items-price');

				updateLineItem(lineItemQtyHiddenInput, lineItemId, lineItemPrice, lineItemTotalPriceHiddenInput, lineItemTotalPrice, cartTotal)

			}

		})

	})
}

function updateLineItem(lineItemQtyHiddenInput, lineItemId, lineItemPrice, lineItemTotalPriceHiddenInput, lineItemTotalPrice, cartTotal) {
$.ajax({
	type: 'PATCH',
	url: `/line_items/${lineItemId}.json`,
	data: {quantity: lineItemQtyHiddenInput.value},
	dataType: 'json',
	success: function(response) {
		// console.log(JSON.stringify(response.quantity));
		const lineItemQty = response.quantity;
		lineItemQty.innerHTML = response.quantity;

	 	const total = getLineItemTotalPrice(lineItemQty, lineItemPrice);
	 	lineItemTotalPriceHiddenInput.value = total
	 	lineItemTotalPrice.innerHTML = numberToBRL(total)

	 	const allLineItemsTotalPriceInputs = document.querySelectorAll('input[name="line_item_total_price"');

	 	const totalPrice = addLineItemsTotalPriceToArray(allLineItemsTotalPriceInputs).reduce((a, b) => a + b, 0.0);

	 	cartTotal.innerHTML = numberToBRL(totalPrice)
	},
	error: function(response) {
		console.log(JSON.stringify(response));
	}
})
}


function deleteLineItem(buttons) {
	buttons.forEach(submit => {
		submit.addEventListener("click", function(e) {
			e.preventDefault();

			const lineItemId = e.target.parentNode.parentNode.querySelector('input[name="id"]').value

			$.ajax({
				type: 'DELETE',
				url: `/line_items/${lineItemId}`,
				success: function(response) {
					console.log('Sucesso' + response)
					const tr = document.querySelector(`#line-item-${lineItemId}`);
					tr.remove();
			 		const allLineItemsTotalPriceInputs = document.querySelectorAll('input[name="line_item_total_price"');
			 		const cartTotal = document.querySelector('#all-line-items-price');
 				 	let lineItemsTotalPriceArray = []
				 	allLineItemsTotalPriceInputs.forEach(item => {
				 		lineItemsTotalPriceArray.push(parseFloat(item.value))
				 	})
				 	const totalPrice = lineItemsTotalPriceArray.reduce((a, b) => a + b, 0.0)
				 	cartTotal.innerHTML = numberToBRL(totalPrice)
				},
				error: function(response) {
					console.log('Erro' + response)
				}
			})
		})
	})
}