$(document).ready(function() {
  // --- our code goes here ---

  const inputLength = [];
  
  $("#tweet-text").on('input', function() {
    // Element Definition::
    const $counterElement = $(this).siblings('div').children('.counter');

    // Get the length of the inputted text
    const $message = $(this).val().length;

    // Store the lengths in a lengths array
    inputLength.push($message);

    // Extract the number of text input available
    const wordsLeft = Number($counterElement.text());

    /**
     * Check Length of Input length array
     * Less than or Equal to 1 => input pasted in or just one letter
     * More than 1 ==> input enter by typing one character at a time
     * */
    if (inputLength.length <= 1) {
        $counterElement.text(wordsLeft - inputLength.slice(-1));
    } else {
        $counterElement.text(wordsLeft - inputLength.slice(-2)[1] + inputLength.slice(-2)[0]);
    }

    // Ensure that color of counter is black
    $counterElement.css('color', 'black');

    // When counter is less than or equal to zero, change color to red
    if (Number($counterElement.text()) <= 0) {
        $counterElement.css('color', 'red'); 
    } 
 });
});