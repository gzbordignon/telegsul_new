import Rails from "@rails/ujs";

const updateCartTotal = (cartId, cartData = "cart[frete]=false", cartTotalTd, cartTotal) => {
  Rails.ajax({
    type: "PATCH",
    url: `/carrinho/${cartId}.json`,
    data: cartData,
    success: res => {
      // console.log(res);
      cartTotalTd.innerHTML = numberToBRL(res);
      cartTotal.value = res;
    },
    error: res => {
      // console.log(res);
    },
  });
};

const numberToBRL = number => {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return formatter.format(number);
};

export { updateCartTotal, numberToBRL };
