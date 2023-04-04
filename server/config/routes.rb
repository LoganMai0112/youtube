require 'sidekiq/web'

Rails.application.routes.draw do
  devise_for :users, path: '',
                     path_names: {
                       sign_in: 'login',
                       sign_out: 'logout',
                       registration: 'signup'
                     },
                     controllers: {
                       sessions: 'users/sessions',
                       registrations: 'users/registrations',
                       omniauth_callbacks: 'users/omniauth_callbacks'
                     }
  resources :videos do
    resource :like, only: %i[create destroy]
    resource :view, only: %i[create]
    resources :comments, only: %i[create destroy update index]
  end

  resources :streams

  resources :reports, only: %i[create destroy index]

  resources :playlists do
    resource :playlist_item, only: %i[create destroy]
    resource :user_playlist, only: %i[create destroy]
  end

  resources :notifications, only: %i[index update]

  get '/users/:id/edit', to: 'users#edit'
  get '/analytics', to: 'users#analytic'

  get '/search', to: 'searchs#search'

  put '/videos/:id/recover', to: 'videos#recover'
  put '/users/:id/recover', to: 'users#recover'

  resources :users do
    resource :subscribe, only: %i[create destroy]
  end

  mount ActionCable.server, at: '/cable'
  mount Sidekiq::Web => '/sidekiq'

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
