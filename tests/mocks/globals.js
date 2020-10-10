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

class JWT {
  static decode(token) {
    return {
      exp: Date.now(),
      userInfo: {
        permissionType: 1
      }
    };
  }
}

global.jwt = JWT;
