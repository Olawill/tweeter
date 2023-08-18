$(document).ready(function() {
  // --- our code goes here ---


  // Extract the number of text input available
  const $wordsLeft = Number($('.counter').val());

  $("#tweet-text").on('input', function() {
    // Element Definition::
    const $counterElement = $(this).siblings('div').children('.counter');

    // Get the length of the inputted text
    const $messageLength = $(this).val().length;

    /**
     * Check Length of Input length array
     * Less than or Equal to 1 => input pasted in or just one letter
     * More than 1 ==> input enter by typing one character at a time
     * Reduce the character counter  
     * 
     */
    $counterElement.val($wordsLeft - $messageLength);

    // Ensure that color of counter is black
    $counterElement.css('color', 'black');

    // When counter is less than or equal to zero, change color to red
    if (Number($counterElement.val()) < 0) {
        $counterElement.css('color', 'red'); 
    }
  });
});