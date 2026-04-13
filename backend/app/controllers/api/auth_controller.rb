class Api::AuthController < ApplicationController
  skip_before_action :verify_authenticity_token

  def login
    user = User.find_by(email: params[:email])

    if user&.valid_password?(params[:password])
      render json: {
        token: user.api_key,
        user: {
          id: user.id,
          email: user.email
        }
      }
    else
      render json: { error: "Invalid email or password" }, status: :unauthorized
    end
  end

  def signup
    user = User.new(
      email: params[:email],
      password: params[:password]
    )

    if user.save
      render json: {
        token: user.api_key,
        user: { id: user.id, email: user.email }
      }
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end
end