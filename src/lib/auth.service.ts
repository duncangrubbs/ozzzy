import AuthTypes from '../shared-types/auth-types.enum.js'

class Auth {
  type?: AuthTypes
  token?: string
  header?: string

  constructor(type?: AuthTypes, token?: string, header?: string) {
    this.type = type
    this.token = token
    this.header = header
  }

  getHeaders(): Array<Array<string>> {
    if (!this.type || !this.token || !this.header) {
      return []
    }
    return [[this.header!, `${this.type} ${this.token}`]]
  }
}

export default Auth
