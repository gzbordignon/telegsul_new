class CreateShippings < ActiveRecord::Migration[6.0]
  def change
    create_table :shippings do |t|
      t.string :street
      t.string :number
      t.string :complement
      t.string :postal_code
      t.string :district
      t.string :city
      t.string :state
      t.belongs_to :order, null: false, foreign_key: true

      t.timestamps
    end
  end
end
