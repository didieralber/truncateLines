/**
 * Truncate text to a number of lines
 *
 * @param {string|HTMLElement|HTMLCollection} text_element  Class name, HTML element or HTMLCollection of elements to be truncated.
 * @param {integer}                           max_lines     Maximum number of lines.
 * @param {string}                            [replace]     String added at the end of the text if it exceed the number of lines. Defaults to an ellipsis (…).
 */
function truncateLines (text_element, max_lines, replace) {
  'use strict';

  // Parameter : text_element
  if (typeof text_element !== 'object') {
    // className
    var text_elements_list = document.getElementsByClassName(text_element);

  } else if (typeof text_element.offsetHeight !== 'undefined') {
    // HTML element
    var text_elements_list = [text_element];

  } else if (typeof text_element.length !== 'undefined' && text_element.length > 0 && typeof text_element[0].offsetHeight !== 'undefined') {
    // Set of HTML elements
    var text_elements_list = text_element;

  } else {
    throw "Incorrect parameter : text_element";
  }

  // Parameter : max_lines
  max_lines = parseInt(max_lines);
  if (isNaN(max_lines) || max_lines < 0) {
    throw "Incorrect parameter : max_lines";
  }

  // Parameter : replace
  if (typeof replace === 'undefined') {
    replace = '&hellip;';
  }
  var decode = document.createElement('span')
  decode.innerHTML = replace;
  replace = decode.firstChild.nodeValue;

  if (text_elements_list.length <= 0) {
    // No elements, nothing to do
    return;
  }


  // Going through each element to truncate
  for (var i = 0; i < text_elements_list.length; i++) {
    var text_element = text_elements_list[i];
    var text_array = text_element.firstChild.nodeValue.replace(/\s+/g, ' ').split(' ');
    var current_text = '';
    var current_line = 1;


    // Calculating the height of a line of text
    // Half of the line height is good enough to check if the line changed.
    text_element.firstChild.nodeValue = '|';
    var current_height = text_element.offsetHeight;
    var line_change_height = Math.floor(current_height / 2);

    // Adding words until the line limit
    var stop = false;
    for (var j = 0; j < text_array.length; j++) {
      if (text_array[j] === '') { continue; }

      var current_word = ' ' + text_array[j];
      text_element.firstChild.nodeValue = current_text + current_word + replace;
      var previous_height = current_height;
      current_height = text_element.offsetHeight;


      // Checking if the line changed
      if (current_height >= (previous_height + line_change_height)) {
        current_line++;
        if (current_line > max_lines) {
          text_element.firstChild.nodeValue = current_text + replace;
          stop = true;
          break;
        }
      }

      current_text += current_word;
    }


    // If the loop ended normally, all the text fit and the replacement character isn't needed
    if (!stop) {
      text_element.firstChild.nodeValue = current_text;
    }
  }
}
