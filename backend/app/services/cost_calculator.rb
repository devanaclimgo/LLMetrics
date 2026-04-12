class CostCalculator
  PRICING = {
    "openai" => {
      "gpt-4" => { input: 0.03, output: 0.06 }
    },
    "anthropic" => {
      "claude-3" => { input: 0.015, output: 0.075 }
    }
  }.freeze

  def self.call(event)
    new(event).call
  end

  def initialize(event)
    @event = event
  end

  def call
    input_cost + output_cost
  end

  private

  attr_reader :event

  def pricing
    PRICING[event.model] || default_pricing
  end

  def default_pricing
    { input: 0, output: 0 }
  end

  def input_cost
    (event.input_tokens.to_i / 1000.0) * pricing[:input]
  end

  def output_cost
    (event.output_tokens.to_i / 1000.0) * pricing[:output]
  end
end