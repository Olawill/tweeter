$(document).ready(function() {
  // BACK TO TOP SCROLL BUTTON
  const btn = $('#backToTop');
  $(window).on('scroll', () => {
    if ($(window).scrollTop() > 300) {
        btn.addClass('show');
    } else {
        btn.removeClass('show');
    }
  });

  btn.on('click', (event) => {
    event.preventDefault();
    $('html, body').animate({
        scrollTop: 0
    }, '300');
    // Check if the textarea is visible
    if (!$('#tweets-compose').is(':visible')) {
      $('#tweets-compose').show();
    }
    // Enable textareas for input automatically
    $('#tweet-text').trigger('focus');
  });
});