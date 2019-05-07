Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :artists, only: [:index, :update]
      resources :albums, only: [:index, :create, :update]
      resources :notes, only: [:index, :update]
    end
  end



end
