class User < ApplicationRecord
  enum document_type: {
    "CPF"          => 0, 
    "CNPJ"    => 1
  }

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :orders
  has_one :billing_address
  accepts_nested_attributes_for :billing_address

  VALID_NAME_REGEX = /\A([\w]{3,})+\s+([\w\s]{3,})+\z/
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  validates :name, presence: true, format: { with: VALID_NAME_REGEX, message: "invalid name" }
  validates :document_number, presence: true
  validates :document_number, length: { is: 11 }, if: :cpf?, format: { with: /\d/ }
  validates :document_number, length: { is: 14 }, if: :cnpj?, format: { with: /\d/ }
  validates :email, presence: true, format: { with: VALID_EMAIL_REGEX, message: "invalid email" }
  validates :area_code, presence: true, length: { is: 2 }, format: { with: /\d/ }
  validates :phone_number, presence: true, length: { in: 8..9 }, format: { with: /\d/ }
  validates :password, presence: true, length: { minimum: 6 }

  def after_confirmation
    UserMailer.welcome_email(self).deliver
  end


  def cpf?
    document_type == "CPF"
  end

  def cnpj?
    document_type == "CNPJ"
  end

  def buildOrder(order_params, link, status, reference, pay_type)
    orders.new(
      order_params.merge(
        link: link,
        status: status, 
        reference: reference, 
        pay_type: pay_type
      )
    )
  end
end
