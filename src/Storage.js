/**
 * @author Duncan Grubbs
 * @description Storage abstraction layer for dependency injection
 * @version 0.1.0
 */

class Storage {
  static setItem(key, value) {
    return localStorage.setItem(key, value);
  }

  static getItem(key) {
    return localStorage.getItem(key);
  }

  static removeItem(key) {
    return localStorage.removeItem(key);
  }
}

module.exports = Storage;
