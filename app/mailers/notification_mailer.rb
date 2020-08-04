class NotificationMailer < ApplicationMailer

	default from: 'notifications@example.com'

	def your_order
		@order = params[:order]
		mail(to: 'gonzmieato@gmail.com', subject: "This is your order.")
	end
	
end
