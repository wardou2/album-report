Rails.application.routes.draw do
  get '/', to: 'application#index'

  namespace :api do
    namespace :v1 do
      resources :artists, only: [:index, :update]
      resources :albums, only: [:index, :create, :update, :destroy, :show]
      resources :notes, only: [:index, :update]
    end
  end



end
