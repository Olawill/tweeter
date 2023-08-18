/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// LOAD THE TWEET ELEMENTS ON THE PAGE
const createTweetElement = (tweetObject) => {

  let $tweet =  `<article class="tweets__item">
            <header>
              <div>
                <span>
                  <img src="${tweetObject.user.avatars}" alt="${tweetObject.user.name}">
                  <span>${tweetObject.user.name}</span>
                </span>
                <a href="#">${tweetObject.user.handle}</a>
              </div>
              <div>${escaped(tweetObject.content.text)}</div>
            </header>
            <hr>
            <footer>
              <div class="tweets__item__posted">${timeago.format(new Date(tweetObject.created_at))}</div>
              <div class="icons">
                <i class="fa-solid fa-flag"></i>
                <i class="fa-solid fa-retweet"></i>
                <i class="fa-solid fa-heart"></i>
              </div>
            </footer>
          </article>`;
  return $tweet;
};

// LOOP FOR THE RENDERING TWEETS ON THE PAGE
const renderTweets = (tweets) => {

  // loop through the tweets
  tweets.forEach((tweet) => {
    // call the create tweet element for each tweet
    const tweetElement = createTweetElement(tweet);
    // takes the return value and appends it to the tweets container
    $('#tweets-container').prepend(tweetElement);
  });
};

// ESCAPE FUNCTION FOR CROSS SITE SCRIPTING
const escaped = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}




// Ensure DOM is loaded
$(() => {
 
  $( "form" ).on( "submit", function( event ) {
    // Stop default behaviour
    event.preventDefault();

    // Extract the text been  inputted into the text area
    const textAreaData = $(this).children('textarea').val();
    
    if (!textAreaData) {
      // If text area is empty
      $errHandler('Tweet cannot be empty!!!');
      
    } else if (textAreaData.length > 140) {
      // Input longer than 140
      $errHandler('Too Long. Your tweet must not exceed the 140 character limit!!!');
      
    } else {
      const data = $( this ).serialize();

      // RESET ERROR MESSAGE AND STYLE
      $errHandler('');

      $('.counter').val('140');
      $(this).children('textarea').val('');
      $.ajax({
        type: "POST",
        url: 'tweets',
        data: data,
        success: function() {
            $.ajax('/tweets', { method: 'GET' })
              .then(function (data) {
                const newTweet = data.slice(-1)[0];
                $('#tweets-container').prepend(createTweetElement(newTweet));
              });
            },
        error: function(err) {
          console.log(`Error posting to server ${JSON.stringify(err)}`);
            }
          })
        }
      });

  // HANDLE HOVER AND CLICK EVENT OVER THE NEW TWEET BUTTON AT THE TOP
  $('#logo-tweet').on('mouseenter', () => {
    $('.fa-angles-down').css('color', 'chartreuse')
  }).on('mouseleave', () => {
    $('.fa-angles-down').css('color', '#FF0000')
  }).on('click', () => {
    if ($('#tweets-compose').is(':visible')) {
      $('#tweets-compose').hide();
      $('article:nth-of-type(1)').css('marginTop', '3em')
    } else {
      $('#tweets-compose').show();
      $('#tweet-text').trigger('focus');
    }
  });

  // HANDLE ERROR MESSAGES
  const $errHandler = (message) => {
    if (message) {
      $('#error-text').text(message);
        $('.error-message').slideDown(400, () => {
          $(this)
          .css(
              'display', 'flex'
          );
        });
    } else {
      $('#error-text').text('');
        $('.error-message').slideUp("fast", () => {
          $(this)
          .css(
            'display', 'none'
          );
        });
    }
  };

  // LOAD TWEET ON TO THE PAGE
  const $loadTweet = () => {
    $.ajax('/tweets', { method: 'GET' })
    .then(function (data) {
      renderTweets(data);
    })
    .catch((err) => {
      console.log(`Error loading tweets ${err}`);
    });
  };
  $loadTweet();
});