module AuthenticateApiRequest
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_api_request!
  end

  private

  def authenticate_api_request!
    header = request.headers["Authorization"]
    token = header&.split(" ")&.last

    @current_user = User.find_by(api_key: token)

    render json: { error: "Unauthorized" }, status: :unauthorized unless @current_user
  end
end