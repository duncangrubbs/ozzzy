const buildJWTParser = require('./jwt');

let store = {};

class LocalStorageMock {
  static clear() {
    store = {};
  }

  static getItem(key) {
    return store[key] || null;
  }

  static setItem(key, value) {
    store[key] = value.toString();
  }

  static removeItem(key) {
    delete store[key];
  }
};

global.localStorage = LocalStorageMock;

global.jwt = buildJWTParser(false, true);
