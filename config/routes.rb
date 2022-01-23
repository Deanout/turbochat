Rails.application.routes.draw do
  root 'pages#home'
  devise_scope :user do
    # Redirests signing out users back to sign-in
    get 'users', to: 'devise/sessions#new'
  end
  devise_for :users
end
