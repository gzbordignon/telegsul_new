class RenameComplementoToComplementFromShippingAddresses < ActiveRecord::Migration[6.0]
  def change
  	rename_column :shipping_addresses, :complemento, :complement
  end
end
