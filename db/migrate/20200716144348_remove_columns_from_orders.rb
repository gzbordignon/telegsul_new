class RemoveColumnsFromOrders < ActiveRecord::Migration[6.0]
  def change
    remove_column :orders, :name, :string
    remove_column :orders, :email, :string
    remove_column :orders, :address, :text
  end
end
