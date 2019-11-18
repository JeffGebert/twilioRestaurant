$(document).ready(function() {
  console.log("loading checkout.js")
  let cart = JSON.parse(window.localStorage.getItem('cart'));
  console.log(cart)
  let itemsTotal = 0;
  let amountTotal = 0;

  for (item in cart) {
    let $row = `
    <tr><td>${item}</td><td>${cart[item].quantity}</td><td>${cart[item].price}</td></tr>
    `
    itemsTotal += cart[item].quantity
    amountTotal += cart[item].price * cart[item].quantity
    $(".headerTable").after($row)


  }

  $(".itemTotal").text(itemsTotal);
  $(".amountTotal").text(amountTotal);
  $(".btn-checkout").text("Place Order");

})

