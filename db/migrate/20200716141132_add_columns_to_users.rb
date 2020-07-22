class AddColumnsToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :name, :string
    add_column :users, :document, :string
    add_column :users, :area_code, :string
    add_column :users, :phone_number, :string
  end
end
