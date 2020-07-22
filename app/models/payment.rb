class Payment < ApplicationRecord
  enum pay_type: {
    "Check"          => 0, 
    "Credit card"    => 1, 
    "Purchase order" => 2
  }
  belongs_to :order
end
