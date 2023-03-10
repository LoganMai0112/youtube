Rails.application.routes.draw do
  get 'comments/create'
  get 'comments/destroy'
  get 'comments/update'
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
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
