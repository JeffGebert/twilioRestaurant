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

    const $checkout = $('.btn-checkout');
    $checkout.click(function(event) {
     // event.preventDefault();

      const customerDetails = {}


      customerDetails.name = $('#name').val()
      customerDetails.email = $('#email').val()
      customerDetails.phone_number = $('#phone_number').val()
      customerDetails.credit_card = $('#credit_card').val()
      console.log('customerDetails', customerDetails)

      customerInfo = JSON.stringify(customerDetails)

    $.ajax({
      url: '/checkout',
      type:'POST',
      data: {name: 'Bryan',
      email: 'bryan@gmail.com',
      phone_number: '514-984-2349',
      credi_card: '3226591446'
      },

      // dataType: "json"


    })
    .then(()=> console.log("DATA FROM SERVER", data))
    // .done(function() {
    //   alert( "second success" );
    // })
    // .fail(function() {
    //   alert( "error" );
    // })
    // .always(function() {
    //   alert( "finished" );
    // });
    .catch((error) => console.log('error', error))
    })


})
