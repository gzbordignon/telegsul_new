document.addEventListener('turbolinks:load', function() {

	const fisicaSubmit = document.querySelector('#fisica-submit');
	const juridicaSubmit = document.querySelector('#juridica-submit');


	fisicaSubmit.addEventListener('click', function() {
		const paras = fisicaSubmit.form.querySelectorAll('p')
		paras.forEach(p => {
			p.remove();
		})
		submitCreateUser(fisicaSubmit)
	})

	juridicaSubmit.addEventListener('click', function() {
		const paras = juridicaSubmit.form.querySelectorAll('p')
		paras.forEach(p => {
			p.remove();
		})
		submitCreateUser(juridicaSubmit)
	})



});

function submitCreateUser(submitButton) {

		const documentType = submitButton.form.querySelector('input[name="user[document_type]"]')
		const documentField = submitButton.form.querySelector('input[name="user[document_number]"]');
		const form = submitButton.form
		const formId = submitButton.form.id;
		const data = $(`#${formId}`).serialize();

		$.ajax({
			method: 'POST',
			url: '/users.json',
			data: data,
			dataType: 'json',
			success: function(response) {
				setTimeout(function() {
					window.location.href = '/';
				}, 3000);

			},
			error: function(response) {
				console.log(response)
				const errors = response.responseJSON.errors
				
				for (let key in errors) {

					let errors_array = []
					for (let i = 0; i < errors[key].length; i++) {
						if (errors[key][i] == "can't be blank") {
							errors_array.push("Não pode ser branco. ")
						}
						else if (errors[key][i] == "is the wrong length (should be 11 characters)") {
							errors_array.push("Precisa ter 11 dígitos. ")
						}	
						else if (errors[key][i] == "invalid name") {
							errors_array.push("Precisa ter mais que um nome. Ex: João Silveira ")
						}						
						else if (errors[key][i] == "is the wrong length (should be 14 characters)") {
							errors_array.push("Precisa ter 14 dígitos. ")
						}
						else if (errors[key][i] == "is the wrong length (should be 2 characters)") {
							errors_array.push("Precisa ter 2 dígitos. ")
						}
						else if (errors[key][i] == "is too short (minimum is 8 characters)") {
							errors_array.push("Precisa ter de 8 à 9 dígitos. ")
						}
						else if (errors[key][i] == "is too short (minimum is 6 characters)") {
							errors_array.push("Precisa ter no mínimo 6 caracteres. ")
						}
						else if (errors[key][i] == "invalid email") {
							errors_array.push("Ex: joaodasilva@example.com")
						}
					}

					const div = form.querySelector(`input[name="user[${key}]"]`).parentNode;
						for (let i = 0; i < errors_array.length; i++) {
							const p = document.createElement('p');
							div.prepend(p);
							p.innerHTML = errors_array[i];
							p.style.color = 'red';
						}
				}
				
			}
	})
}


