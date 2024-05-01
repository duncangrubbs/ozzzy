import { AuthTypes } from '../shared-types/auth-types.enum.js'
import { AuthProvider } from '../shared-types/auth.type.js'

export class OzzzyAuth implements AuthProvider {
  type: AuthTypes
  token: string
  header: string

  constructor(type: AuthTypes, token: string, header: string) {
    this.type = type
    this.token = token
    this.header = header
  }

  getHeaders(): [string, string][] {
    switch (this.type) {
      case AuthTypes.Bearer:
        return [[this.header!, `${this.type} ${this.token}`]]
      default:
        return []
    }
  }
}
