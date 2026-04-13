class User < ApplicationRecord
  before_create :generate_api_key

  private

  def generate_api_key
    self.api_key = "sk_" + SecureRandom.hex(16)
  end
  
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
