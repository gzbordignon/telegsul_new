class ChangeFreteTypeFromCarts < ActiveRecord::Migration[6.0]
  def change
  	change_column :carts, :frete, :boolean
  end
end
