class AddColumnsToOrders < ActiveRecord::Migration[6.0]
  def change
    add_column :orders, :status, :string
    add_column :orders, :shipping, :boolean
    add_column :orders, :shipping_id, :integer
    add_column :orders, :user_id, :integer
  end
end
