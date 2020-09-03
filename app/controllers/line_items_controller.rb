class LineItemsController < ApplicationController
  include CurrentCart
  before_action :set_cart, only: [:create, :increase_qty, :decrease_qty]
  before_action :set_line_item, only: [:show, :edit, :update, :increase_qty, :decrease_qty, :destroy]

  # GET /line_items
  # GET /line_items.json
  def index
    @line_items = LineItem.all
  end

  # GET /line_items/1
  # GET /line_items/1.json
  def show
  end

  # GET /line_items/new
  def new
    @line_item = LineItem.new
  end

  # GET /line_items/1/edit
  def edit
  end

  # POST /line_items
  # POST /line_items.json
  def create
    @line_item = @cart.add_product(
      product_id: params[:product_id],
      quantity: params[:quantity],
      art: params[:art],
      images: params[:images]
    )

    redirect_to cart_path(@cart)
  end

  # PATCH/PUT /line_items/1
  # PATCH/PUT /line_items/1.json
  def update
    respond_to do |format|
      if @line_item.update(line_item_params)
        format.html { redirect_to @line_item, notice: 'Line item was successfully updated.' }
        format.json { render :show, status: :ok, location: @line_item }
      else
        format.html { render :edit }
        format.json { render json: @line_item.errors, status: :unprocessable_entity }
      end
    end
    @line_item = LineItem.find(params[:id])
    @line_item.update(quantity: params[:quantity])

    respond_to do |format|
      if @line_item.update(quantity: params[:quantity])
        format.json { render json: @line_item }
      end
    end

  end

  def increase_qty
    @line_item = @cart.line_items.find(params[:id])
    @line_item.update(quantity: @line_item.quantity.to_i + 1)
    @line_item.save
    respond_to do |format|
      if @line_item.save
        format.js
      end
    end
  end

  def decrease_qty
    @line_item = @cart.line_items.find(params[:id])
    @line_item.update(quantity: @line_item.quantity.to_i - 1) if @line_item.quantity > 1
    respond_to do |format|
      if @line_item.save
        format.js
      end
    end
  end


  # DELETE /line_items/1
  # DELETE /line_items/1.json
  def destroy
    @line_item.destroy
    respond_to do |format|
      format.html { }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_line_item
      @line_item = LineItem.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def line_item_params
      params.require(:line_item).permit(:quantity, :product_id, images: [])
      # params.require(:line_item).permit(:quantity, :product_id)
    end
end
