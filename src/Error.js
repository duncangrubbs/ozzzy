/**
 * @author Duncan Grubbs
 * @description Custom Error HTML Component for rendering API errors on screen.
 * @version 0.1.0
 */

class Error extends HTMLElement {
  constructor() {
    super();

    this.width = '20px';
    this.height = '20px';
  }

  connectedCallback() {
    // Standard styles
    this.style.position = 'fixed';
    this.style.zIndex = '1000';
    this.style.width = this.width;
    this.style.height = this.height;

    // Styles from attributes
    this.style.background = this.hasAttribute('color') ? this.getAttribute('color') : '#45b4f5';
  }
}

customElements.define('custom-error', Error);
