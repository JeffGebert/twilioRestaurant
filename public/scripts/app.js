//on document ready hide the empy and limit paragraph texts which are displayed when there is too many characters or an empty string is entered.
$(document).ready(function() {
  const menuItems = {};

  //when the tweet button is clicked the following code is run on sumbit.
  const $buttonCount = $('.buttonCount');
  $buttonCount.click(function(event) {

    //Determine Item and incrementer for quantity
    let incrementer = $(this).text();
    let itemTitle = $(this).closest('.product').find('.itemTitle').text();



    if (menuItems[itemTitle]) {
      if (incrementer === '+') {
        if (itemTitle === "Exotic Venezuelan Sausage") {
        } else {
          menuItems[itemTitle] +=1
        }
      } else {
        menuItems[itemTitle] -=1
        if (menuItems[itemTitle] ===0) {
          delete menuItems[itemTitle]
          $(this).closest('.add2cart').find('.itemCount').text(0);
        }
      }
    } else {
      if (incrementer === '+') {
        menuItems[itemTitle] =1
      }

    }

    $(this).closest('.add2cart').find('.itemCount').text(menuItems[itemTitle]);
    //$form.find("textarea").val("");

    window.localStorage.setItem('cart', JSON.stringify(menuItems));






    // event.preventDefault();
    // //we subtract five here because with no string $(this).serialize will return length of 5 with a value of "".
    // if (($(this).serialize().length - 5) > 140) {
    //   $('.limit').show();
    // } else if ($('textarea').val() === "") {
    //   $('.empty').show();
    // } else {
    //   $('.limit').hide();
    //   $('.empty').hide();
    //   $.ajax({
    //     type: 'POST',
    //     url:'http://localhost:8080/Tweets',
    //     data:$(this).serialize()
    //   })

    //     .done(loadTweets);
    //   $form.find("textarea").val("");
    //   $form.find(".counter").html(140);
    //   //resets the textarea to the defualt after tweet is clicked.  this way the form is ready for a new tweet with its default values.
  })

});
