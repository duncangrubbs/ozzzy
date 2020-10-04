/**
 * @author Duncan Grubbs
 * @description Custom Error HTML Component for rendering API errors on screen.
 * @version 0.1.0
 */

class Error extends HTMLElement {
  constructor(error) {
    super();

    this.error = error;

    this.width = '100%';
    this.height = '20px';
  }

  connectedCallback() {
    // Standard styles
    this.style.display = 'flex';
    this.style.borderRadius = '4px';
    this.style.width = this.width;
    this.style.height = this.height;
    this.innerText = `Error: ${this.error}`;

    // Styles from attributes
    this.style.background = this.hasAttribute('color') ? this.getAttribute('color') : 'red';
  }
}

customElements.define('custom-error', Error);
