class ChangeShippingToAddress < ActiveRecord::Migration[6.0]
  def change
  	rename_table :shippings, :addresses
  end
end
