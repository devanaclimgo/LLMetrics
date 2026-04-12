# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_04_12_142001) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "api_keys", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "token"
    t.datetime "updated_at", null: false
    t.string "user_name"
  end

  create_table "cost_summaries", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.date "date"
    t.decimal "total_cost"
    t.datetime "updated_at", null: false
  end

  create_table "events", force: :cascade do |t|
    t.decimal "cost"
    t.datetime "created_at", null: false
    t.string "feature"
    t.integer "input_tokens"
    t.jsonb "metadata"
    t.string "model"
    t.integer "output_tokens"
    t.string "provider"
    t.datetime "updated_at", null: false
    t.string "user_id"
  end
end
