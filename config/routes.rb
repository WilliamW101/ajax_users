Rails.application.routes.draw do
  root 'courses#index'

  get 'users', to: 'users#index'
end
