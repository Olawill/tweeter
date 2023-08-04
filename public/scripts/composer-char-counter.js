$(document).ready(function() {
  // --- our code goes here ---

  const inputLength = [];

  $("#tweet-text").on('input', function() {
    // Get the length of the inputted text
    const message = $(this).val().length;

    // Store the lengths in a lengths array
    inputLength.push(message);

    // Extract the number of text input available
    const wordsLeft = Number($(this).siblings('div').children('.counter').text());

    /**
     * Check Length of Input length array
     * Less than or Equal to 1 => input pasted in or just one letter
     * More than 1 ==> input enter by typing one character at a time
     * */
    if (inputLength.length <= 1) {
        $(this).siblings('div').children('.counter').text(wordsLeft - inputLength.slice(-1));
    } else {
        $(this).siblings('div').children('.counter').text(wordsLeft - inputLength.slice(-2)[1] + inputLength.slice(-2)[0]);
    }

    // Ensure that color of counter is black
    $(this).siblings('div').children('.counter').css('color', 'black');

    // When counter is less than or equal to zero, change color to red
    if (Number($(this).siblings('div').children('.counter').text()) <= 0) {
        $(this).siblings('div').children('.counter').css('color', 'red'); 
    } 
    // else {
    //     $(this).siblings('div').children('.counter').css('color', 'black');
    // }
 });
});