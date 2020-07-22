class Order < ApplicationRecord
  enum pay_type: {
    "boleto"          => 0, 
    "credit_card"    => 1, 
    "transfer" => 2
  }
  
  
  has_many :line_items, dependent: :destroy
  has_many :payments
  belongs_to :user
  has_one :shipping
  accepts_nested_attributes_for :shipping
  
  # validates :name, :address, :email, presence: true
  # validates :pay_type, inclusion: pay_types.keys

  def add_line_items_from_cart(cart)
    cart.line_items.each do |item|
      item.cart_id = nil
      line_items << item
    end
  end

  def total_price
    line_items.to_a.sum { |item| item.total_price }
  end

  


  # def credit_card
  #   payment = PagSeguro::CreditCardTransactionRequest.new
  #   payment.payment_mode = "gateway"

  #   @cart.line_items.each do |item|
  #     payment.items << {
  #        id: item.product.id,
  #        description: item.product.description,
  #        quantity: item.quantity,
  #        amount: item.product.price,
  #        weight: 0
  #     }
  #   end

  #   payment.reference = "REF1234-credit-card"

  #   payment.sender = {
  #     hash: params[:sender_hash],
  #     name: 'Guilherme Bordignon',
  #     email: 'c85440628659073287030@sandbox.pagseguro.com.br',
  #     document: { type: "CPF", value: '03310782018'},
  #     phone: {
  #       area_code: '51',
  #       number: '995823059'
  #     }
  #   }

  #   payment.credit_card_token = params[:card_token]

  #   payment.holder = {
  #     name: 'Guilherme Bordignon',
  #     birth_date: '10/06/1994',
  #     document: {
  #       type: "CPF", value: '03310782018'
  #     },
  #     phone: {
  #       area_code: '51',
  #       number: '995823059'
  #     }
  #   }

  #   payment.shipping = {
  #     type_name: "sedex",
  #     address: {
  #       street: "Lino Estácio dos Santos",
  #       number: "1535",
  #       complement: "casa 231",
  #       city: "Gravataí",
  #       state: "RS",
  #       district: "Oriçó",
  #       postal_code: "94010400"
  #     }
  #   }

  #   payment.billing_address = {
  #     street: "Lino Estácio dos Santos",
  #     number: "1535",
  #     complement: "casa 231",
  #     city: "Gravataí",
  #     state: "RS",
  #     district: "Oriçó",
  #     postal_code: "94010400"
  #   }

  #   payment.installment = {
  #     value: params[:price],
  #     quantity: params[:card_options]
  #   }

  #   puts "=> REQUEST"
  #   puts PagSeguro::TransactionRequest::RequestSerializer.new(payment).to_params
  #   puts

  #   payment.create

  #   if payment.errors.any?
  #     puts "=> ERRORS"
  #     puts payment.errors.join("\n")
  #   else
  #     puts "=> Transaction"
  #     puts "  code: #{payment.code}"
  #     puts "  reference: #{payment.reference}"
  #     puts "  type: #{payment.type_id}"
  #     puts "  payment link: #{payment.payment_link}"
  #     puts "  status: #{payment.status}"
  #     puts "  payment method type: #{payment.payment_method}"
  #     puts "  created at: #{payment.created_at}"
  #     puts "  updated at: #{payment.updated_at}"
  #     puts "  gross amount: #{payment.gross_amount.to_f}"
  #     puts "  discount amount: #{payment.discount_amount.to_f}"
  #     puts "  net amount: #{payment.net_amount.to_f}"
  #     puts "  extra amount: #{payment.extra_amount.to_f}"
  #     puts "  installment count: #{payment.installment_count}"

  #     puts "    => Items"
  #     puts "      items count: #{payment.items.size}"
  #     payment.items.each do |item|
  #       puts "      item id: #{item.id}"
  #       puts "      description: #{item.description}"
  #       puts "      quantity: #{item.quantity}"
  #       puts "      amount: #{item.amount.to_f}"
  #     end

  #     puts "    => Sender"
  #     puts "      name: #{payment.sender.name}"
  #     puts "      email: #{payment.sender.email}"
  #     puts "      phone: (#{payment.sender.phone.area_code}) #{payment.sender.phone.number}"
  #     puts "      document: #{payment.sender.document}: #{payment.sender.document}"

  #     puts "    => Shipping"
  #     puts "      street: #{payment.shipping.address.street}, #{payment.shipping.address.number}"
  #     puts "      complement: #{payment.shipping.address.complement}"
  #     puts "      postal code: #{payment.shipping.address.postal_code}"
  #     puts "      district: #{payment.shipping.address.district}"
  #     puts "      city: #{payment.shipping.address.city}"
  #     puts "      state: #{payment.shipping.address.state}"
  #     puts "      country: #{payment.shipping.address.country}"
  #     puts "      type: #{payment.shipping.type_name}"
  #     puts "      cost: #{payment.shipping.cost}"
  #   end
  # end

end
