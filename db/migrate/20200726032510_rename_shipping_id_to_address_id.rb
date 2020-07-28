class RenameShippingIdToAddressId < ActiveRecord::Migration[6.0]
  def change
  	rename_column :orders, :shipping_id, :address_id
  end
end
