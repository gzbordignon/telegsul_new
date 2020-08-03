class ChangeColumnsFromUsers < ActiveRecord::Migration[6.0]
  def change
  	change_column :users, :document_type, 'integer USING CAST(document_type AS integer)'
  	change_column :users, :document_number, :string
  end
end
