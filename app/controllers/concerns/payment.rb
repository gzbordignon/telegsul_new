module Payment

	private

    def get_status(status)
      case status
      when 1
        'Aguardando Pagamento'
      when 2
        'Em Análise'
      when 3
        'Pago'
      when 4
        'Disponível'
      when 5
        'Em Disputa'
      when 6
        'Devolvida'
      when 7
        'Cancelada'
      when 8
        'Debitado'
      when 9
        'Retenção Temporária'
      end
    end

    def serializer(payment)
      puts "=> REQUEST"
      puts PagSeguro::TransactionRequest::RequestSerializer.new(payment).to_params
      puts
    end

    def items(cart, payment, shipping_boolean)
      cart.line_items.each do |item|
        payment.items << {
           id: item.product.id,
           description: item.product.description,
           quantity: item.quantity,
           amount: item.product.price,
           weight: 0
        }
      end
      if shipping_boolean == 'false'
        payment.items
      else
        payment.items << {id: 0, description: 'frete', 'quantity': 1, amount: 10.0}
      end
    end

    def sender_info(payment, sender_hash, user)
      payment.sender = {
        hash: sender_hash,
        name: user.name,
        email: user.email,
        document: { type: 'CPF', value: '03310782018'}, # gem do fork é assim, na oficial é só cpf: '03310782018'
        phone: {
          area_code: user.area_code,
          number: user.phone_number
        }
      }
    end

    def sender_boleto(payment, sender_hash, user)
      payment.sender = {
        hash: sender_hash,
        name: user.name,
        email: user.email,
        cpf: '03310782018',
        phone: {
          area_code: user.area_code,
          number: user.phone_number
        }
      }
    end

    def holder_info(payment, card_info)
      payment.holder = {
        name: card_info[:card_name],
        birth_date: '10/06/1994',
        document: {
          type: "CPF", value: '03310782018'
        },
        phone: {
          area_code: '51',
          number: '34424323'
        }
      }
    end

    def card_token(payment, token)
      payment.credit_card_token = token
    end

    def shipping_address(payment, shipping_address_attributes, shipping_boolean)
      if shipping_boolean == 'false'
        payment.shipping = {
          type_id: 3,
          address: {
            street: 'Rua Eufrásio Nunes',
            number: '60',
            complement: 'Casa',
            postal_code: '94010120',
            district: 'Centro',
            city: 'Gravataí',
            state: 'RS'
          }
        }
      else
        payment.shipping = {
          type_id: 3,
          address: {
            street: shipping_address_attributes[:street],
            number: shipping_address_attributes[:number],
            complement: shipping_address_attributes[:complement],
            postal_code: shipping_address_attributes[:postal_code],
            district: shipping_address_attributes[:district],
            city: shipping_address_attributes[:city],
            state: 'RS'
          }
        }
      end
    end


    def billing_address(payment, user)
      payment.billing_address = {
        street: 'Av. Getúlio Vargas',
        number: '2888',
        complement: 'Sala 2',
        district: user.billing_address.district,
        postal_code: '94810002',
        city: 'Alvorada',
        state: 'RS'
      }
    end

    def installments(payment, card_options)
      items_array = []
      payment.items.each { |item| items_array << item.amount.to_f}
      price = items_array.inject(:+)
      payment.installment = {
        value: price,
        quantity: card_options
      }
    end

    def errors(payment)
      if payment.errors.any?
        puts "=> ERRORS"
        puts payment.errors.join("\n")
      else
        puts "=> Transaction"
        puts "  code: #{payment.code}"
        puts "  reference: #{payment.reference}"
        puts "  type: #{payment.type_id}"
        puts "  payment link: #{payment.payment_link}"
        puts "  status: #{payment.status}"
        puts "  payment method type: #{payment.payment_method}"
        puts "  created at: #{payment.created_at}"
        puts "  updated at: #{payment.updated_at}"
        puts "  gross amount: #{payment.gross_amount.to_f}"
        puts "  discount amount: #{payment.discount_amount.to_f}"
        puts "  net amount: #{payment.net_amount.to_f}"
        puts "  extra amount: #{payment.extra_amount.to_f}"
        puts "  installment count: #{payment.installment_count}"

        puts "    => Items"
        puts "      items count: #{payment.items.size}"
        payment.items.each do |item|
          puts "      item id: #{item.id}"
          puts "      description: #{item.description}"
          puts "      quantity: #{item.quantity}"
          puts "      amount: #{item.amount.to_f}"
        end

        puts "    => Sender"
        puts "      name: #{payment.sender.name}"
        puts "      email: #{payment.sender.email}"
        puts "      phone: (#{payment.sender.phone.area_code}) #{payment.sender.phone.number}"
        puts "      document: #{payment.sender.document}: #{payment.sender.document}"

        puts "    => Shipping"
        puts "      street: #{payment.shipping.address.street}, #{payment.shipping.address.number}"
        puts "      complement: #{payment.shipping.address.complement}"
        puts "      postal code: #{payment.shipping.address.postal_code}"
        puts "      district: #{payment.shipping.address.district}"
        puts "      city: #{payment.shipping.address.city}"
        puts "      state: #{payment.shipping.address.state}"
        puts "      country: #{payment.shipping.address.country}"
        puts "      type: #{payment.shipping.type_name}"
        puts "      cost: #{payment.shipping.cost}"
        items_array = []
        payment.items.each { |item| items_array << item.amount.to_f }
        puts items_array.inject(:+)
      end
    end

  	def credit_card_payment(payment, cart, sender_hash, token, card_options, shipping_boolean, order, user, shipping_address_attributes, card_info)
      
      payment.payment_mode = "gateway"

      items(cart, payment, shipping_boolean)

      # payment.reference = "REF-credit-card-" + (order.last.id + 1).to_s

      payment.reference = "REF-credit-card-123"

      sender_info(payment, sender_hash, user)

      holder_info(payment, card_info)

      card_token(payment, token)

      shipping_address(payment, shipping_address_attributes, shipping_boolean)

      billing_address(payment, user)

      installments(payment, card_options)

      serializer(payment)

      payment.create

      errors(payment)

    end

    def gerar_boleto(payment, cart, sender_hash, shipping_boolean, shipping_address_attributes, order, user)

      # payment.notification_url = "https://telegsul.herokuapp.com/notification"
      payment.notification_url = "http://localhost:3000/notification"

      payment.payment_mode = "default"

      items(cart, payment, shipping_boolean)

      # payment.reference = "REF-boleto-" + (order.last.id + 1).to_s
      payment.reference = "REF-boleto-123"
    
      sender_boleto(payment, sender_hash, user)

      shipping_address(payment, shipping_address_attributes, shipping_boolean)

      serializer(payment)

      payment.create

      errors(payment)

      payment

    end


end


 # payment = PagSeguro::CreditCardTransactionRequest.new
 #      payment.payment_mode = "gateway"

 #      cart.line_items.each do |item|
 #        payment.items << {
 #           id: item.product.id,
 #           description: item.product.description,
 #           quantity: item.quantity,
 #           amount: item.product.price,
 #           weight: 0
 #        }
 #      end

 #      payment.reference = "REF1234-credit-card"

 #      payment.sender = {
 #        hash: sender_hash,
 #        name: 'Guilherme Bordignon',
 #        email: 'c85440628659073287030@sandbox.pagseguro.com.br',
 #        document: { type: "CPF", value: '03310782018'},
 #        phone: {
 #          area_code: '51',
 #          number: '995823059'
 #        }
 #      }

 #      payment.credit_card_token = card_token

 #      payment.holder = {
 #        name: 'Guilherme Bordignon',
 #        birth_date: '10/06/1994',
 #        document: {
 #          type: "CPF", value: '03310782018'
 #        },
 #        phone: {
 #          area_code: '51',
 #          number: '995823059'
 #        }
 #      }

 #      payment.shipping = {
 #        type_name: "sedex",
 #        address: {
 #          street: "Lino Estácio dos Santos",
 #          number: "1535",
 #          complement: "casa 231",
 #          city: "Gravataí",
 #          state: "RS",
 #          district: "Oriçó",
 #          postal_code: "94010400"
 #        }
 #      }

 #      payment.billing_address = {
 #        street: "Lino Estácio dos Santos",
 #        number: "1535",
 #        complement: "casa 231",
 #        city: "Gravataí",
 #        state: "RS",
 #        district: "Oriçó",
 #        postal_code: "94010400"
 #      }

 #      payment.installment = {
 #        value: price,
 #        quantity: card_options
 #      }

 #      puts "=> REQUEST"
 #      puts PagSeguro::TransactionRequest::RequestSerializer.new(payment).to_params
 #      puts

 #      payment.create

 #      if payment.errors.any?
 #        puts "=> ERRORS"
 #        puts payment.errors.join("\n")
 #      else
 #        puts "=> Transaction"
 #        puts "  code: #{payment.code}"
 #        puts "  reference: #{payment.reference}"
 #        puts "  type: #{payment.type_id}"
 #        puts "  payment link: #{payment.payment_link}"
 #        puts "  status: #{payment.status}"
 #        puts "  payment method type: #{payment.payment_method}"
 #        puts "  created at: #{payment.created_at}"
 #        puts "  updated at: #{payment.updated_at}"
 #        puts "  gross amount: #{payment.gross_amount.to_f}"
 #        puts "  discount amount: #{payment.discount_amount.to_f}"
 #        puts "  net amount: #{payment.net_amount.to_f}"
 #        puts "  extra amount: #{payment.extra_amount.to_f}"
 #        puts "  installment count: #{payment.installment_count}"

 #        puts "    => Items"
 #        puts "      items count: #{payment.items.size}"
 #        payment.items.each do |item|
 #          puts "      item id: #{item.id}"
 #          puts "      description: #{item.description}"
 #          puts "      quantity: #{item.quantity}"
 #          puts "      amount: #{item.amount.to_f}"
 #        end

 #        puts "    => Sender"
 #        puts "      name: #{payment.sender.name}"
 #        puts "      email: #{payment.sender.email}"
 #        puts "      phone: (#{payment.sender.phone.area_code}) #{payment.sender.phone.number}"
 #        puts "      document: #{payment.sender.document}: #{payment.sender.document}"

 #        puts "    => Shipping"
 #        puts "      street: #{payment.shipping.address.street}, #{payment.shipping.address.number}"
 #        puts "      complement: #{payment.shipping.address.complement}"
 #        puts "      postal code: #{payment.shipping.address.postal_code}"
 #        puts "      district: #{payment.shipping.address.district}"
 #        puts "      city: #{payment.shipping.address.city}"
 #        puts "      state: #{payment.shipping.address.state}"
 #        puts "      country: #{payment.shipping.address.country}"
 #        puts "      type: #{payment.shipping.type_name}"
 #        puts "      cost: #{payment.shipping.cost}"
 #      end