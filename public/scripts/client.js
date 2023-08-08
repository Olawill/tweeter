/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = (tweetObject) => {
  const now = new Date();
  const createdAt = new Date(tweetObject.created_at);
  let numberOfDaySince;
  
  // Get the numbers od day since the tweet was posted
  const daySince = Math.round((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));

  if (daySince < 7) {
    numberOfDaySince = `${daySince} days`;
  } else if (daySince <= 14) {
    umberOfDaySince = 'Two Weeks';
  } else if (daySince < 30) {
    umberOfDaySince = 'About a month';
  } else if (Math.ceil(daySince / 30) < 12) {
    umberOfDaySince = `${Math.ceil(daySince / 30)} months`;
  } else {
    numberOfDaySince = `${Math.ceil(daySince/365)} years`;
  }

  return `<article class="tweets__item">
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
              <div class="tweets__item__posted">${numberOfDaySince} ago</div>
              <div class="icons">
                <i class="fa-solid fa-flag"></i>
                <i class="fa-solid fa-retweet"></i>
                <i class="fa-solid fa-heart"></i>
              </div>
            </footer>
          </article>`
};


// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
};


// Ensure DOM is loaded
$(() => {
  const $tweet = createTweetElement(tweetData);
   
  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like

  $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  
 });

