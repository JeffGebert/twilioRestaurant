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

    const $checkout = $('.form-inline');
    $checkout.submit(function(event) {
     event.preventDefault();
      console.log("submitting the form")

      const customerDetails = {}

      customerDetails.name = $('#name').val()
      customerDetails.email = $('#email').val()
      customerDetails.phone_number = $('#phone_number').val()
      customerDetails.credit_card = $('#credit_card').val()
      customerDetails.items=cart;

      $.ajax({
      url: '/checkout',
      type:'POST',
      data: customerDetails,
      dataType: "json"
    })
    .then((data)=> console.log("DATA FROM SERVER", data))
    .catch((error) => console.log('error', error))
    })


})
