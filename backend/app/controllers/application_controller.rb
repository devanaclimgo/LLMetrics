class Api::V1::DashboardController < ApplicationController
  def authenticate_user!
    token = request.headers["Authorization"]&.split(" ")&.last
    @current_user = User.find_by(api_key: token)

    render json: { error: "Unauthorized" }, status: :unauthorized unless @current_user
  end
end