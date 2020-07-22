class TestsController < ApplicationController
  before_action :set_test, only: [:show, :edit, :update, :destroy]

  # GET /tests
  # GET /tests.json
  def index
    @tests = Test.all
  end

  # GET /tests/1
  # GET /tests/1.json
  def show
  end

  # GET /tests/new
  def new
    @test = Test.new
  end

  # GET /tests/1/edit
  def edit
  end

  # POST /tests
  # POST /tests.json
  def create
    # @test = Test.new(test_params)

    # respond_to do |format|
    #   if @test.save
    #     format.html { redirect_to @test, notice: 'Test was successfully created.' }
    #     format.json { render :show, status: :created, location: @test }
    #   else
    #     format.html { render :new }
    #     format.json { render json: @test.errors, status: :unprocessable_entity }
    #   end
    # end

    # @test = Test.new(test_params)

    # respond_to do |format|
    #   if @test.save
    #     format.html { puts 'lol' }
    #     format.json { render json: @test}
    #   end
    # end

    puts params[:name]



    payment = PagSeguro::BoletoTransactionRequest.new
    payment.payment_mode = "default"

     
    payment.items << {
       id: 1,
       description: 'lol',
       quantity: 4,
       amount: 29.00,
       weight: 0
    }
     

      payment.reference = "REF1234-credit-card"

      payment.sender = {
        hash: params[:sender_hash],
        name: params[:name], #precisa ter o @test = Test.new na new action
        email: 'c85440628659073287030@sandbox.pagseguro.com.br',
        cpf: '03310782018',
        phone: {
          area_code: '51',
          number: '995823059'
        }
      }



      payment.shipping = {
        type_name: "sedex",
        address: {
          street: "Lino Estácio dos Santos",
          number: "1535",
          complement: "casa 231",
          city: "Gravataí",
          state: "RS",
          district: "Oriçó",
          postal_code: "94010400"
        }
      }

      puts "=> REQUEST"
      puts PagSeguro::TransactionRequest::RequestSerializer.new(payment).to_params
      puts

      payment.create

      respond_to do |format|
        if payment.errors.any?
          puts 'error'
        else
          format.json { render json: payment }
        end
      end
  end

  # PATCH/PUT /tests/1
  # PATCH/PUT /tests/1.json
  def update
    respond_to do |format|
      if @test.update(test_params)
        format.html { redirect_to @test, notice: 'Test was successfully updated.' }
        format.json { render :show, status: :ok, location: @test }
      else
        format.html { render :edit }
        format.json { render json: @test.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /tests/1
  # DELETE /tests/1.json
  def destroy
    @test.destroy
    respond_to do |format|
      format.html { redirect_to tests_url, notice: 'Test was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_test
      @test = Test.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def test_params
      params.require(:test).permit(:name, :cpf)
    end
end
