module Payment

	private

    def serializer(payment)
      puts "=> REQUEST"
      puts PagSeguro::TransactionRequest::RequestSerializer.new(payment).to_params
      puts
    end

    def items(cart, payment, order)
      cart.line_items.each do |item|
        payment.items << {
           id: item.product.id,
           description: item.product.description,
           quantity: item.quantity,
           amount: item.product.price,
           weight: 0
        }
      end
      if order[:shipping] == 'false'
        payment.items
      else
        payment.items << {id: 0, description: 'frete', 'quantity': 1, amount: 10.0}
      end
    end

    def sender(payment, sender_hash, user)
      payment.sender = {
        hash: sender_hash,
        name: user.name,
        email: user.email,
        document: { type: user.document_type, value: user.document_number}, # gem do fork é assim, na oficial é só cpf: '03310782018'
        phone: {
          area_code: user.area_code,
          number: user.phone_number
        }
      }
    end

    def holder_info(payment, card)
      payment.holder = {
        name: card[:card_name],
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

    def card_token(payment, card)
      payment.credit_card_token = card[:card_token]
    end

    def shipping_address(payment, order)
      if order[:shipping] == 'false'
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
            street: order[:shipping_address_attributes][:street],
            number: order[:shipping_address_attributes][:number],
            complement: order[:shipping_address_attributes][:complement],
            postal_code: order[:shipping_address_attributes][:postal_code],
            district: order[:shipping_address_attributes][:district],
            city: order[:shipping_address_attributes][:city],
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
        district: 'Centro',
        postal_code: '94810002',
        city: 'Alvorada',
        state: 'RS'
      }
    end

    def installments(payment, card)
      items_array = []
      payment.items.each { |item| items_array << item.amount.to_f}
      price = items_array.inject(:+)
      payment.installment = {
        value: price,
        quantity: card[:card_options]
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
      end
    end

end

