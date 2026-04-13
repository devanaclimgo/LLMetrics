Rails.application.routes.draw do
  devise_for :users
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    post "login", to: "auth#login"
    post "signup", to: "auth#signup"
    namespace :v1 do
      resources :events, only: [:create]
      get "dashboard", to: "dashboard#index"
      get "cost_over_time", to: "dashboard#cost_over_time"
      get "insights", to: "dashboard#insights"
    end
  end
end
