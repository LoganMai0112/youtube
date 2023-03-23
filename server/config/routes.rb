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
    resource :like
    resources :comments, only: %i[create destroy update index]
  end

  resources :streams

  get '/users/:id/edit', to: 'users#edit'

  get '/search', to: 'searchs#search'

  resources :users do
    resource :subscribe, only: %i[create destroy]
  end

  mount ActionCable.server, at: '/cable'

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
