class NotificationMailer < ApplicationMailer

	default from: 'notifications@example.com'

	def your_order(user)
		@user = user
		mail(to: @user.email, subject: "This is your order.")
	end
	
end
