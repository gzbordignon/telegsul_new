Rails.application.routes.draw do
  
  resources :line_items
  root to: 'store#index'
  resources :orders do
  	resources :payments
  end
  resources :carts
  resources :products
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
