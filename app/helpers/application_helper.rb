module ApplicationHelper
	def number_to_currency_brl(number)
		number_to_currency(number, unit: 'R$ ', separator: ',', delimiter: '.')
	end
end
