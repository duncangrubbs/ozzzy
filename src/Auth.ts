enum AuthType {
  Bearer = 'Bearer'
}

class Auth {
  type: AuthType;
  token: string;

  constructor(type: AuthType, token: string) {
    this.type = type;
    this.token = token;
  }

  getHeaders() {
    return [['Authorization', `${this.type} ${this.token}`]];
  }
}
