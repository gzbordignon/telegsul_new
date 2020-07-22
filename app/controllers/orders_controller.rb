class OrdersController < ApplicationController
  include CurrentCart
  include Payment
  before_action :set_cart, only: [:new, :create]
  before_action :ensure_cart_isnt_empty, only: :new
  before_action :set_order, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!
  # skip_before_action :verify_authenticity_token

  # GET /orders
  # GET /orders.json
  def index
    @orders = Order.all
  end

  # GET /orders/1
  # GET /orders/1.json
  def show
  end

  # GET /orders/new
  def new
    @order = Order.new
    # @session_id = (PagSeguro::Session.create).id
  end

  # GET /orders/1/edit
  def edit
  end

  # POST /orders
  # POST /orders.json
  def create
    puts params[:order][:shipping_attributes]

    # if params[:pay_type] == 'boleto'
      # payment = PagSeguro::BoletoTransactionRequest.new
      # boleto(payment, @cart, params[:sender_hash])
    # elsif params[:pay_type] == 'credit_card'
      # payment = PagSeguro::CreditCardTransactionRequest.new
      # credit_card(payment, @cart, params[:sender_hash], params[:card_token], params[:price], params[:card_options])
    # end

    @order = current_user.orders.new(
      order_params
      )
    @order.add_line_items_from_cart(@cart)

    respond_to do |format|
      if @order.save
        Cart.destroy(session[:cart_id])
        session[:cart_id] = nil
        format.html { 
        }
        format.json { render json: @order }
      else
        format.html { render :new }
        format.json { render json: @order.errors,
          status: :unprocessable_entity }
      end
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
      params.require(:order).permit(:pay_type, :status, :shipping, :shipping_id, :user_id, :link, shipping_attributes: [:city])
    end

    def ensure_cart_isnt_empty
      if @cart.line_items.empty?
        redirect_to store_index_url, notice: 'Your cart is empty'
      end
    end

    # Os valores desses params vem do index.jsx
    def pay_type_params
      if order_params[:pay_type] == "Credit Card"
        params.require(:order).permit(:credit_card_number, :expiration_date)
      elsif order_params[:pay_type] == "Check"
        params.require(:order).permit(:routing_number, :account_number)
      elsif order_params[:pay_type] == "Purchase Order"
        params.require(:order).permit(:po_number)
      else
        {}
      end
    end
end
