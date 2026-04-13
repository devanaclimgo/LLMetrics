class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :validatable

  before_create :generate_api_key

  private

  def generate_api_key
    self.api_key = SecureRandom.hex(20)
  end
end