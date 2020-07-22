class AddLinkToOrders < ActiveRecord::Migration[6.0]
  def change
    add_column :orders, :link, :string
  end
end
