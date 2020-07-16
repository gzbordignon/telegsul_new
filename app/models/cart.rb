class Cart < ApplicationRecord
  has_many :line_items, dependent: :destroy

  def add_product(product_id:, quantity: 1)
    product = Product.find(product_id)
    current_item = line_items.find_or_create_by(product_id: product_id)
    
    current_item.quantity = quantity

    current_item.save
  end

  def total_price
    line_items.to_a.sum { |item| item.total_price }
  end
end
