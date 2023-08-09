/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


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
              <div>${tweetObject.content.text}</div>
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


// Ensure DOM is loaded
$(() => {
 
  $( "form" ).on( "submit", function( event ) {
    // Stop default behaviour
    event.preventDefault();

    // Extract the text been  inputted into the text area
    const textAreaData = $(this).children('textarea').val();
    
    if (!textAreaData) {
      // If text area is empty
      alert('Tweet cannot be empty');
    } else if (textAreaData.length > 140) {
      // Input longer than 140
      alert("Your tweet must not exceed the character limit of 140");
    } else {
      const data = $( this ).serialize();
      $('.counter').val('140');
      $(this).children('textarea').val('');
      $.ajax({
        type: "POST",
        url: 'tweets',
        data: data,
        success: function(data) {
            $.ajax('http://localhost:8080/tweets', { method: 'GET' })
              .then(function (data) {
                const newTweet = data.slice(-1)[0];
                $('#tweets-container').prepend(createTweetElement(newTweet));

    });
          }
        })
    }
    
  });

  const $loadTweet =   () => {
    $.ajax('http://localhost:8080/tweets', { method: 'GET' })
    .then(function (data) {
      // console.log('Success: ', data);
      renderTweets(data);

    });
  };
  $loadTweet();
});
