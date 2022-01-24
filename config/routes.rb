Rails.application.routes.draw do
  resources :rooms do
    resources :messages
  end
  root 'pages#home'
  devise_scope :user do
    # Redirests signing out users back to sign-in
    get 'users', to: 'devise/sessions#new'
  end
  get 'user/:id', to: 'users#show', as: 'user'
  devise_for :users
end
