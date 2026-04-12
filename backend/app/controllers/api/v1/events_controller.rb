class Api::V1::EventsController < ApplicationController
  before_action :authenticate!

  def create
    event = Event.new(event_params)

    event.cost = calculate_cost(event)

    if event.save
      render json: { status: "ok", cost: event.cost }
    else
      render json: { errors: event.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def authenticate!
    token = request.headers["Authorization"]&.split(" ")&.last
    @api_key = ApiKey.find_by(token: token)

    render json: { error: "Unauthorized" }, status: :unauthorized unless @api_key
  end

  def event_params
    params.permit(
      :provider,
      :model,
      :input_tokens,
      :output_tokens,
      :feature,
      :user_id,
      metadata: {}
    )
  end

  def calculate_cost(event)
    pricing = {
      "gpt-4" => { input: 0.03, output: 0.06 }
    }

    model_price = pricing[event.model] || { input: 0, output: 0 }

    ((event.input_tokens.to_i / 1000.0) * model_price[:input]) +
    ((event.output_tokens.to_i / 1000.0) * model_price[:output])
  end
end