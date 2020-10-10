/**
 * @author Duncan Grubbs
 * @description Storage abstraction layer for dependency injection
 * @version 0.1.0
 */

class Storage {
  /**
   * Persists an item in local storage under the key
   * @param {String} key Store key
   * @param {String} value Store value
   */
  static setItem(key, value) {
    return localStorage.setItem(key, value);
  }

  /**
   * Returns a persisted item with the key
   * @param {String} key Store key
   */
  static getItem(key) {
    return localStorage.getItem(key);
  }

  /**
   * Removes a persisted item with the given key
   * @param {String} key Store key
   */
  static removeItem(key) {
    return localStorage.removeItem(key);
  }
}

module.exports = Storage;
