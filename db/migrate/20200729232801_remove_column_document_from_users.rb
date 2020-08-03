class RemoveColumnDocumentFromUsers < ActiveRecord::Migration[6.0]
  def change
  	remove_column :users, :document
  end
end
