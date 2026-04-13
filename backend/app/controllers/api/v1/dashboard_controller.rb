class Api::V1::DashboardController < ApplicationController
  before_action :authenticate!

  def index
    events = Event.all

    total_cost = events.sum(:cost)
    total_requests = events.count
    avg_cost = total_requests > 0 ? total_cost / total_requests : 0

    cost_by_feature = events
      .group(:feature)
      .select(
        :feature,
        "COUNT(*) as requests",
        "SUM(cost) as total_cost"
      )

    render json: {
      total_cost: total_cost.to_f,
      total_requests: total_requests,
      avg_cost: avg_cost.to_f,
      cost_by_feature: cost_by_feature.map do |e|
        {
          feature: e.feature,
          requests: e.requests.to_i,
          total_cost: e.total_cost.to_f,
          avg_cost: (e.total_cost.to_f / e.requests.to_i)
        }
      end
    }
  end

  private

  def authenticate!
    token = request.headers["Authorization"]&.split(" ")&.last
    @api_key = ApiKey.find_by(token: token)

    render json: { error: "Unauthorized" }, status: :unauthorized unless @api_key
  end
end