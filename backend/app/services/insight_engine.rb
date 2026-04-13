class InsightEngine
  def self.call(api_key)
    new(api_key).call
  end

  def initialize(api_key)
    @api_key = api_key
    @insights = []
  end

  def call
    detect_cost_spike
    detect_expensive_model
    detect_high_cost_feature

    insights
  end

  private

  attr_reader :api_key, :insights

  def events
    @events ||= api_key.events
  end

  def detect_cost_spike
    today_cost = events.where("created_at >= ?", Time.current.beginning_of_day).sum(:cost)

    avg_last_7_days = events
      .where("created_at >= ?", 7.days.ago)
      .group("DATE(created_at)")
      .sum(:cost)
      .values
      .then { |vals| vals.sum / (vals.size.nonzero? || 1) }

    return if avg_last_7_days.zero?

    increase = (today_cost / avg_last_7_days) - 1

    if increase > 0.5
      insights << {
        type: "warning",
        message: "Cost spike detected",
        description: "Cost is #{(increase * 100).round}% higher than 7-day average"
      }
    end
  end

  def detect_expensive_model
    expensive_models = ["gpt-4", "claude-3-opus"]

    usage = events
      .group(:model)
      .sum(:cost)

    usage.each do |model, cost|
      next unless expensive_models.include?(model)

      if cost > 10 # threshold simples
        insights << {
          type: "suggestion",
          message: "#{model} is driving high cost",
          description: "Consider switching to a cheaper model for some requests"
        }
      end
    end
  end

  def detect_high_cost_feature
    feature_costs = events
      .group(:feature)
      .sum(:cost)

    top_feature = feature_costs.max_by { |_, cost| cost }

    return unless top_feature

    feature, cost = top_feature

    if cost > 5
      insights << {
        type: "info",
        message: "#{feature} is your most expensive feature",
        description: "It accounts for $#{cost.round(2)} in usage"
      }
    end
  end

  def insights
    insights = InsightEngine.call(@api_key)

    render json: insights
  end

  def detect_anomaly
    daily_costs = events
      .where("created_at >= ?", 14.days.ago)
      .group("DATE(created_at)")
      .sum(:cost)
      .values

    return if daily_costs.size < 5

    mean = daily_costs.sum / daily_costs.size.to_f

    variance = daily_costs.sum { |c| (c - mean) ** 2 } / daily_costs.size
    std_dev = Math.sqrt(variance)

    today = daily_costs.last

    z_score = (today - mean) / (std_dev.nonzero? || 1)

    if z_score > 2
      insights << {
        type: "warning",
        message: "Anomalous cost behavior detected",
        description: "Today's cost is statistically higher than normal (z-score: #{z_score.round(2)})"
      }
    end
  end
end