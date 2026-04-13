class Api::V1::DashboardController < ApplicationController
  include AuthenticateApiRequest

  def index
    render json: current_user_data
  end
end