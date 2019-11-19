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

    const customerDetails = {}
    customerDetails[name] = $('.name').val()
    customerDetails[email] = $('.email').val()
    customerDetails[phone_number] = $('.phone_number')
    customerDetails[credit_card] = $('.credit_card')

    const $checkout = $('.btn-checkout');
    $checkout.click(function(event) {
      console.log("hello")
    $.ajax({
      type:'POST',
      url: 'http://localhost:8080/checkout',
      data: JSON.stringify(customerDetails),
      dataType: "json"
    })
    });


  })
