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

  def cost_over_time
    days = params[:days].to_i > 0 ? params[:days].to_i : 7
    range = (days.days.ago.to_date..Date.today)

    data = Event
      .where(created_at: range)
      .group("DATE(created_at)")
      .sum(:cost)

    result = range.map do |date|
      {
        date: date,
        cost: data[date] ? data[date].to_f : 0
      }
    end

    render json: result
  end

  def insights
    insights = []

    events = Event.where("created_at >= ?", 7.days.ago)

    insights += high_cost_by_feature(events)
    insights += expensive_models(events)
    insights += possible_loops(events)

    render json: insights
  end

  def high_cost_by_feature(events)
    result = []

    data = events.group(:feature).sum(:cost)

    data.each do |feature, cost|
      if cost > 5 # Threshold for high cost, can be adjusted
        result << {
          type: "warning",
          message: "High cost detected in #{feature}",
          value: cost.to_f
        }
      end
    end

    result
  end

  def expensive_models(events)
    result = []

    gpt4_usage = events.where(model: "gpt-4").count
    total = events.count

    return result if total == 0

    if (gpt4_usage.to_f / total) > 0.7
      result << {
        type: "suggestion",
        message: "High usage of GPT-4 detected. Consider using a cheaper model for some requests.",
        value: gpt4_usage
      }
    end

    result
  end

  def possible_loops(events)
    result = []

    repeated = events
      .group(:user_id, :feature)
      .having("COUNT(*) > 50")
      .count

    repeated.each do |(user_id, feature), count|
      result << {
        type: "warning",
        message: "Possible loop detected for user #{user_id} in #{feature}",
        value: count
      }
    end

    result
  end

  private

  def authenticate!
    token = request.headers["Authorization"]&.split(" ")&.last
    @api_key = ApiKey.find_by(token: token)

    render json: { error: "Unauthorized" }, status: :unauthorized unless @api_key
  end
end