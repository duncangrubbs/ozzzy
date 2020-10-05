/**
 * @author Duncan Grubbs
 * @description HTML Component for rendering API errors on screen.
 * @version 0.1.0
 */

function Error(error) {
  const elem = document.createElement('div');
  elem.innerHTML = error;
  return elem;
}

module.exports = Error;
