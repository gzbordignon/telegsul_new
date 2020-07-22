class PaymentsController < ApplicationController
  before_action :set_payment, only: [:show, :edit, :update, :destroy]
  # respond_to :json, only: [:test]

  # GET /payments
  # GET /payments.json

  def test
    @order = Order.find(params[:order_id])

    # respond_to do |format|
    #   format.html { render layout: false }
    #   # format.json { render layout: false }
    #   # format.js { render layout: false }
    #   # format.xml { render layout: false }
    # end
  end

  # def lol
  #   respond_to do |format|
  #     format.html
  #     format.js {render :layout => false }
  #   end
  # end
  
  def index
    @payments = Payment.all
  end

  # GET /payments/1
  # GET /payments/1.json
  def show
  end

  # GET /payments/new
  def new
    # @payment = Payment.new
    @order = Order.find(params[:order_id])
    @session_id = (PagSeguro::Session.create).id
  end

  # GET /payments/1/edit
  def edit
  end

  # POST /payments
  # POST /payments.json
  def create
    @order = Order.find(params[:order_id])

    # pagseguro = PagSeguro::BoletoTransactionRequest.new
    
    # boleto(pagseguro, @cart, params[:sender_hash])

    # if @payment.save
    #   redirect_to root_path
    # else
    #   render 'new'
    # end
    # respond_to do |format|
    #   if @payment.save
    #     format.html { redirect_to root_path, notice: 'Payment was successfully created.' }
    #     format.json { render :show, status: :created, location: @payment }
    #   else
    #     format.html { render :new }
    #     format.json { render json: @payment.errors, status: :unprocessable_entity }
    #   end
    # end
  end

  # PATCH/PUT /payments/1
  # PATCH/PUT /payments/1.json
  def update
    respond_to do |format|
      if @payment.update(payment_params)
        format.html { redirect_to @payment, notice: 'Payment was successfully updated.' }
        format.json { render :show, status: :ok, location: @payment }
      else
        format.html { render :edit }
        format.json { render json: @payment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /payments/1
  # DELETE /payments/1.json
  def destroy
    @payment.destroy
    respond_to do |format|
      format.html { redirect_to payments_url, notice: 'Payment was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_payment
      @payment = Payment.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def payment_params
      params.require(:payment).permit(:order_id)
    end
end
