class RenameSteetNumberToNumberFromShippingAddress < ActiveRecord::Migration[6.0]
  def change
  	rename_column :shipping_addresses, :street_number, :number
  end
end
