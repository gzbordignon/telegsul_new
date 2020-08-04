class NotificationController < ApplicationController
  # protect_from_forgery: false
  before_action :set_access, only: :create
  skip_before_action :verify_authenticity_token

  
  def create

    transaction = PagSeguro::Transaction.find_by_notification_code(params[:notificationCode])

    status = ['Aguardando Pagamento', 'Em análise', 'Paga', 'Disponível', 'Em disputa', 'Devolvida', 'Cancelada']

    if transaction.errors.empty?
      order = Order.where(reference: transaction.reference).last
      order.status = status[transaction.status.id.to_i - 1]
      order.save
      NotificationMailer.your_order(order.user).deliver_later
    end
 


      render nothing: true, status: 200
  end

  private

    def set_access
      headers['Access-Control-Allow-Origin'] = 'https://sandbox.pagseguro.uol.com.br'
    end

end
