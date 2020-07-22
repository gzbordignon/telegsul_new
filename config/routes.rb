Rails.application.routes.draw do
  
  resources :tests
  get 'test/new'
  get 'test/create'
  devise_for :users, controllers: {
  	registrations: 'registrations'
  }
  resources :line_items
  root to: 'store#index'
  resources :orders do
  	get '/payments', to: 'payments#test'
    post '/payments', to: 'payments#test'
  end
  resources :carts
  resources :products
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
