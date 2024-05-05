export interface AuthProvider {
  getHeaders(): [string, string][]
}
