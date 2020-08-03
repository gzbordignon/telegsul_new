class ChangeDocumentTypeToString < ActiveRecord::Migration[6.0]
  def change
  	change_column :users, :document_type, :string
  end
end
