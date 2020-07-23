Rails.application.routes.draw do
  
  resources :tests
  devise_for :users, controllers: {
  	registrations: 'registrations'
  }
  resources :line_items
  root to: 'store#index'
  resources :orders
  resources :carts
  resources :products
  get '/pagamento' => 'orders#pagamento'
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
