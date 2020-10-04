/**
 * @author Duncan Grubbs
 * @description Storage abstraction layer for dependency injection
 * @version 0.1.0
 */

class Storage {
  constructor(provider) {
    this.provider = provider;
  }

  setItem(key, value) {
    this.provider.setItem(key, value);
  }

  getItem(key) {
    this.provider.getItem(key);
  }

  removeItem(key) {
    this.provider.removeItem(key);
  }
}

module.exports = Storage;
