class CreateEvents < ActiveRecord::Migration[8.1]
  def change
    create_table :events do |t|
      t.string :provider
      t.string :model
      t.integer :input_tokens
      t.integer :output_tokens
      t.decimal :cost
      t.string :feature
      t.string :user_id
      t.jsonb :metadata

      t.timestamps
    end
  end
end
