Rails.application.routes.draw do
  
  root to: 'store#index'
  devise_for :users, controllers: { registrations: 'registrations' }
  get 'notification/create'
  post '/notification' => 'notification#create'
  resources :tests
  resources :products
  resources :line_items
  patch '/increase_line_item_qty/:id' => 'line_items#increase_qty', as: 'increase_line_item_qty'
  patch '/decrease_line_item_qty/:id' => 'line_items#decrease_qty', as: 'decrease_line_item_qty'
  get '/carrinho/:id' => 'carts#show', as: 'cart'
  patch '/carrinho/:id' => 'carts#update'
  get '/finalizar_pedido' => 'orders#new', as: 'new_order'
  get '/pedidos' => 'orders#index', as: 'orders'
  post '/orders' => 'orders#create'
  get '/pedido/:id' => 'orders#show', as: 'order'
  get 'pedido/:id/boleto' => 'orders#boleto', as: 'boleto'
  
end
