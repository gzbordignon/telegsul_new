PagSeguro.configure do |config|
  config.token       = ENV["PAGSEGURO_TOKEN"]
  config.email       = ENV["PAGSEGURO_EMAIL"]
  config.environment = ENV["PAGSEGURO_ENVIRONMENT"].to_s
  config.encoding    = ENV["PAGSEGURO_ENCODING"]
end
