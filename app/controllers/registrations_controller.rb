class RegistrationsController < Devise::RegistrationsController

	private

		def sign_up_params
			params.require(:user).permit(:name, :email, :document, :area_code, :phone_number, :password, :password_confirmation, billing_address_attributes: [:street, :number, :complement, :district, :postal_code, :city])
		end

		def account_update_params
			params.require(:user).permit(:name, :email, :document, :area_code, :phone_number, :password, :password_confirmation, :current_password)
		end		

end