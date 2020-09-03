class OrdersController < ApplicationController
  include CurrentCart
  include Payment
  before_action :set_cart, only: [:new, :create]
  before_action :ensure_cart_isnt_empty, only: :new
  before_action :authenticate_user!
  # skip_before_action :verify_authenticity_token

  # GET /orders
  # GET /orders.json
  def index
    @orders = current_user.orders
  end

  # GET /orders/1
  # GET /orders/1.json
  def show
    @order = current_user.order.find(params[:id])
  end

  def boleto
    @order = current_user.order.find(params[:id])
  end

  # GET /orders/new
  def new
    @order = Order.new
    @session_id = (PagSeguro::Session.create).id
  end

  # GET /orders/1/edit
  def edit
  end

  # POST /orders
  # POST /orders.json
  def create
    #4111111111111111
    # if params[:order][:pay_type] == 'Boleto'
    #   create_boleto_order(@cart, params[:sender_hash], params[:order], current_user, order_params)
    # elsif params[:order][:pay_type] == 'Cartão de crédito'
    #   create_card_order(@cart, params[:sender_hash], params[:card], params[:order], current_user, order_params)
    # end

    # @order = current_user.orders.new(order_params)
    # @order.save

    @response = params

    respond_to do |format|
      format.json { render json: @response }
    end

  end

  # PATCH/PUT /orders/1
  # PATCH/PUT /orders/1.json
  def update
    respond_to do |format|
      if @order.update(order_params)
        format.html { redirect_to @order, notice: 'Order was successfully updated.' }
        format.json { render :show, status: :ok, location: @order }
      else
        format.html { render :edit }
        format.json { render json: @order.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /orders/1
  # DELETE /orders/1.json
  def destroy
    @order.destroy
    respond_to do |format|
      format.html { redirect_to orders_url, notice: 'Order was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_order
      @order = Order.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def order_params
      params.require(:order).permit(:pay_type, :status, :reference, :shipping, :user_id, :link, shipping_address_attributes: [:street, :number, :complement, :district, :postal_code, :city, :state])
    end

    def ensure_cart_isnt_empty
      if @cart.line_items.empty?
        redirect_to root_path, notice: 'Your cart is empty'
      end
    end

    def create_boleto_order(pay_type, cart, sender_hash, order, user, order_params)
      reference = "REF-BOLETO-#{cart.id}"
      payment = PagSeguro::BoletoTransactionRequest.new
      gerar_boleto(payment, cart, sender_hash, order, user, reference)
      check_payment_errors(payment, cart, pay_type, user, order_params, reference)
    end

    def create_card_order(pay_type, cart, sender_hash, card, order, user, order_params)
      reference = "REF-CREDIT-CARD-#{cart.id}"
      payment = PagSeguro::CreditCardTransactionRequest.new
      credit_card_payment(payment, cart, sender_hash, card, order, reference, user)
      check_payment_errors(payment, cart, pay_type, user, order_params, reference)
    end

    def check_payment_errors(payment, cart, pay_type, user, order_params, reference)
      if payment.errors.empty?
        @order = user.buildOrder(order_params, payment.payment_link, get_status((payment.status).to_i), reference, pay_type)
        @order.add_line_items_from_cart(cart)
        response = { order: @order, payment: payment }
        if @order.save
          respond_to do |format|
            Cart.destroy(session[:cart_id])
            session[:cart_id] = nil
            format.json { render json: response}
          end
        end
      else
        response = { payment: payment }
        respond_to do |format|
          format.json { render json: response }
        end
      end
    end

    def gerar_boleto(payment, cart, sender_hash, order, user, reference)
      payment.notification_url = "https://telegsul.herokuapp.com/notification"
      # payment.notification_url = "http://localhost:3000/notification"
      payment.payment_mode = "default"
      items(cart, payment, order)
      payment.reference = reference
      sender(payment, sender_hash, user)
      shipping_address(payment, order)
      serializer(payment)
      payment.create
      errors(payment)
      payment
    end

    def credit_card_payment(payment, cart, sender_hash, card, order, reference, user)
      payment.payment_mode = "gateway"
      items(cart, payment, order)
      payment.reference = reference
      sender(payment, sender_hash, user)
      holder_info(payment, card)
      card_token(payment, card)
      shipping_address(payment, order)
      billing_address(payment, user)
      installments(payment, card)
      serializer(payment)
      payment.create
      errors(payment)
      payment
    end

    def get_status(status)
      case status
      when 1
        'Aguardando Pagamento'
      when 2
        'Em Análise'
      when 3
        'Pago'
      when 4
        'Disponível'
      when 5
        'Em Disputa'
      when 6
        'Devolvida'
      when 7
        'Cancelada'
      when 8
        'Debitado'
      when 9
        'Retenção Temporária'
      end
    end
end
