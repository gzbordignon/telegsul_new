class CreateShippingAddresses < ActiveRecord::Migration[6.0]
  def change
    create_table :shipping_addresses do |t|
      t.string :street
      t.string :street_number
      t.string :complemento
      t.string :district
      t.string :postal_code
      t.string :city
      t.string :state
      t.string :country
      t.integer :order_id

      t.timestamps
    end
  end
end
