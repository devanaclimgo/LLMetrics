class CreateCostSummaries < ActiveRecord::Migration[8.1]
  def change
    create_table :cost_summaries do |t|
      t.date :date
      t.decimal :total_cost

      t.timestamps
    end
  end
end
