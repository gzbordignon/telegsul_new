class RegistrationsController < Devise::RegistrationsController
 	skip_before_action :verify_authenticity_token
	respond_to :json

	private

		def sign_up_params
			params.require(:user).permit(:name, :email, :document_type, :document_number, :area_code, :phone_number, :password, :password_confirmation, billing_address_attributes: [:street, :number, :complement, :district, :postal_code, :city])
		end

		def account_update_params
			params.require(:user).permit(:name, :email, :document_type, :document_number, :area_code, :phone_number, :password, :password_confirmation, :current_password)
		end		

end