Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    namespace :v1 do
      resources :events, only: [:create]
      get "dashboard", to: "dashboard#index"
      get "cost_over_time", to: "dashboard#cost_over_time"
    end
  end
end
