$(document).ready(function() {

  const $timeToMake = $('.time');
    $timeToMake.click(function(event) {
      console.log("hello");


    $.ajax({
      url: '/owners/orders/:id',
      type:'POST',
      data: {name:"jeff"},
      dataType: "json"
      })
    .then((data)=> {
      $('.waitTime').hide();

      console.log("DATA FROM SERVER", data)})
    .catch((error) => console.log('error', error))
    })

});
