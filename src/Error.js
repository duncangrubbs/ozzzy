/**
 * @author Duncan Grubbs
 * @description HTML Component for rendering API errors on screen
 * @version 0.1.0
 */

/**
 * Returns error HTML element to be mounted in the DOM.
 * @param {String} errorMessage Message to be displayed in to user.
 */
function Error(errorMessage) {
  const errorElement = document.createElement('div');
  errorElement.style.width = '100%';
  errorElement.style.borderRadius = '4px';
  errorElement.style.background = '#d43624';
  errorElement.style.color = '#fff';
  errorElement.textContent = errorMessage;
  return errorElement;
}

module.exports = Error;
