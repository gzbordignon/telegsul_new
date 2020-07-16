class PaymentsController < ApplicationController
  before_action :set_payment, only: [:show, :edit, :update, :destroy]

  # GET /payments
  # GET /payments.json
  def index
    @payments = Payment.all
  end

  # GET /payments/1
  # GET /payments/1.json
  def show
  end

  # GET /payments/new
  def new
    @payment = Payment.new
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

    pagseguro = PagSeguro::CreditCardTransactionRequest.new
    pagseguro.payment_mode = "gateway"

    @order.line_items.each do |item|
      pagseguro.items << {
         id: item.product.id,
         description: item.product.description,
         quantity: item.quantity,
         amount: item.product.price,
         weight: 0
      }
    end

    pagseguro.reference = "REF_#{(0...8).map { (65 + rand(26)).chr }.join}_#{@order.id}"

    pagseguro.sender = {
      hash: params[:sender_hash],
      name: @order.name,
      email: @order.email,
      document: { type: "CPF", value: params[:card_document]},
      phone: {
        area_code: params[:area_code],
        number: params[:phone_number]
      }
    }

    pagseguro.credit_card_token = params[:card_token]

    pagseguro.holder = {
      name: @order.name,
      birth_date: '10/06/1994',
      document: {
        type: "CPF", value: params[:card_document]
      },
      phone: {
        area_code: params[:area_code],
        number: params[:phone_number]
      }
    }

    pagseguro.installment = {
      value: params[:price],
      quantity: params[:card_options]
    }

    puts "=> REQUEST"
    puts PagSeguro::TransactionRequest::RequestSerializer.new(pagseguro).to_params
    puts

    pagseguro.create

    if pagseguro.errors.any?
      puts "=> ERRORS"
      puts pagseguro.errors.join("\n")
    else
      puts "=> Transaction"
      puts "  code: #{pagseguro.code}"
      puts "  reference: #{pagseguro.reference}"
      puts "  type: #{pagseguro.type_id}"
      puts "  pagseguro link: #{pagseguro.payment_link}"
      puts "  status: #{pagseguro.status}"
      puts "  pagseguro method type: #{pagseguro.payment_method}"
      puts "  created at: #{pagseguro.created_at}"
      puts "  updated at: #{pagseguro.updated_at}"
      puts "  gross amount: #{pagseguro.gross_amount.to_f}"
      puts "  discount amount: #{pagseguro.discount_amount.to_f}"
      puts "  net amount: #{pagseguro.net_amount.to_f}"
      puts "  extra amount: #{pagseguro.extra_amount.to_f}"
      puts "  installment count: #{pagseguro.installment_count}"

      puts "    => Items"
      puts "      items count: #{pagseguro.items.size}"
      pagseguro.items.each do |item|
        puts "      item id: #{item.id}"
        puts "      description: #{item.description}"
        puts "      quantity: #{item.quantity}"
        puts "      amount: #{item.amount.to_f}"
      end

      puts "    => Sender"
      puts "      name: #{pagseguro.sender.name}"
      puts "      email: #{pagseguro.sender.email}"
      puts "      phone: (#{pagseguro.sender.phone.area_code}) #{pagseguro.sender.phone.number}"
      puts "      document: #{pagseguro.sender.document}: #{pagseguro.sender.document}"

      # puts "    => Shipping"
      # puts "      street: #{pagseguro.shipping.address.street}, #{pagseguro.shipping.address.number}"
      # puts "      complement: #{pagseguro.shipping.address.complement}"
      # puts "      postal code: #{pagseguro.shipping.address.postal_code}"
      # puts "      district: #{pagseguro.shipping.address.district}"
      # puts "      city: #{pagseguro.shipping.address.city}"
      # puts "      state: #{pagseguro.shipping.address.state}"
      # puts "      country: #{pagseguro.shipping.address.country}"
      # puts "      type: #{pagseguro.shipping.type_name}"
      # puts "      cost: #{pagseguro.shipping.cost}"
    end


    @payment = Payment.create(order_id: params[:order_id])

    if @payment.save
      redirect_to root_path
    else
      render 'new'
    end
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
