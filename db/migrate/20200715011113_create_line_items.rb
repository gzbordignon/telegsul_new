class CreateLineItems < ActiveRecord::Migration[6.0]
  def change
    create_table :line_items do |t|
      t.integer :quantity
      t.references :product, foreign_key: true
      t.belongs_to :cart, foreign_key: true
      t.references :order, foreign_key: true

      t.timestamps
    end
  end
end
