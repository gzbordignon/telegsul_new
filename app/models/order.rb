class Order < ApplicationRecord
  enum pay_type: {
    "Boleto"          => 0, 
    "Cartão de crédito"    => 1, 
    "Transferência bancária" => 2
  }
  has_many :line_items, dependent: :destroy
  has_many :payments
  validates :name, :address, :email, presence: true
  validates :pay_type, inclusion: pay_types.keys

  def add_line_items_from_cart(cart)
    cart.line_items.each do |item|
      item.cart_id = nil
      line_items << item
    end
  end

  def total_price
    line_items.to_a.sum { |item| item.total_price }
  end

end
