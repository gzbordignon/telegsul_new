class AddColumnsDocumentToUsers < ActiveRecord::Migration[6.0]
  def change
  	add_column :users, :document_type, :integer
  	add_column :users, :document_number, :integer
  end
end
