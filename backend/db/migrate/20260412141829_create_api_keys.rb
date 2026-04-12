class CreateApiKeys < ActiveRecord::Migration[8.1]
  def change
    create_table :api_keys do |t|
      t.string :token
      t.string :user_name

      t.timestamps
    end
  end
end
