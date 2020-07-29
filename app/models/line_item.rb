class LineItem < ApplicationRecord
  belongs_to :order, optional: true
  belongs_to :product, optional: true
  belongs_to :cart
  has_many_attached :images

  def total_price
  	if art == 0
    	product.price * quantity
    else
    	(product.price  + 5) * quantity
    end
  end

  def price
    if art == 0
      product.price
    else
      product.price + 5
    end
  end

end
