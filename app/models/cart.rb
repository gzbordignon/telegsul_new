class Cart < ApplicationRecord
  has_many :line_items, dependent: :destroy

  def add_product(product_id:, quantity: 1, art:, images:)
    product = Product.find(product_id)

    current_item = line_items.find_or_create_by(product_id: product_id)
    
    current_item.quantity = quantity

    current_item.art = art

    current_item.images = images

    current_item.save
  end

  def all_line_items_total_price
    if frete == false || frete == nil
      line_items.to_a.sum { |item| item.total_price }
    elsif frete == true
      line_items.to_a.sum { |item| item.total_price } + 10
    end
  end
end
