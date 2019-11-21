$(document).ready(function() {

  const $timeToMake = $('.time');
    $timeToMake.click(function(event) {
      console.log("hello");
      $waitTime = $(`#waitingTime`);
      console.log($waitTime.val());
      $phoneNumber = $(`.waitTime`).attr("data-identifier");
      console.log($phoneNumber);
      $orderID = $(`.time`).attr("data-identifier");
      console.log("order", $orderID)
      const data = {
        waitTime: $waitTime.val(),
        phoneNumber: $phoneNumber,
        orderID:$orderID
      }

    $.ajax({
      url: '/owners/orders/:id',
      type:'POST',
      data: data,
      dataType: "json"
      })
    .then((data2)=> {
      $('.waitTime').hide();
      $(`.afterCustomerNotification`).show();
      $(`.afterCustomerNotificationTime`).text("We let the customer know it will be " + data.waitTime + " minutes until their order is ready");


      console.log("DATA FROM SERVER", data)})
    .catch((error) => console.log('error', error))
    })



});
