class AddFreteToCarts < ActiveRecord::Migration[6.0]
  def change
  	add_column :carts, :frete, :integer
  end
end
