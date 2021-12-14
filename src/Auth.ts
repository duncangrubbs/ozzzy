import AuthTypes from './enums/AuthTypes';

class Auth {
  type?: AuthTypes;
  token?: string;

  constructor(type?: AuthTypes, token?: string) {
    this.type = type;
    this.token = token;
  }

  getHeaders(): Array<Array<string>> {
    if (!this.type && !this.token) {
      return [];
    }
    return [['Authorization', `${this.type} ${this.token}`]];
  }
}

export default Auth;
