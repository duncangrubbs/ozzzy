import { RestMethods } from '../shared-types/rest-methods.enum.js'
import { Middleware } from '../shared-types/middleware.type.js'
import { logger } from '../utils/logger.js'
import { AuthProvider } from '../shared-types/auth.type.js'

export class HttpApi {
  baseUrl: string
  auth?: AuthProvider
  headers: [string, string][] = []
  middleware: Middleware[]

  /**
   * Constructs an HttpApi service instance
   * @param baseUrl URL that is prepended to every call made to this service
   * @param auth Optionally provide an instance of an AuthProvider that will be
   * used to set auth-related headers on every request made with this service
   * instance
   * @param headers Optionally provide additional headers that will be set on
   * every request made with this service instance
   * @param middleware Any middleware functions that will be applied at the service
   * level rather than the request level. These are meant to be global actions.
   */
  constructor(
    baseUrl: string = '',
    auth?: AuthProvider,
    headers: [string, string][] = [],
    ...middleware: Middleware[]
  ) {
    this.middleware = middleware
    this.baseUrl = baseUrl
    this.auth = auth
    this.headers = headers
  }

  /**
   * Builds a URL with query params using the
   * URLSearchParams constructor
   *
   * Example: ('/abc/1', { name: 'John', age: '12' }) => 'BASE_URL/abc/1?name=John&age=12'
   * @param url Endpoint path
   * @param params Optional URL params that you want to be appended to the endpoint
   * @returns The endpoint path with the query params appended
   */
  buildUrl(url: string, params: Record<string, string> = {}): URL {
    const urlObject = new URL(url, this.baseUrl)

    for (const param in params) {
      urlObject.searchParams.append(param, params[param])
    }

    return urlObject
  }

  /**
   * Adds a middleware function at the service level (i.e. it will get applied
   * to all requests)
   * @param middleware Middleware function you want to apply at the
   * service level
   */
  use(middleware: Middleware): void {
    this.middleware.push(middleware)
  }

  /**
   * @param url Relative url to base url provided in the constructor. Represents
   * the 'endpoint' you are routing to
   * @param middleware Optional middleware functions, only applied to this request
   * @returns The response, after all middleware has been applied
   * @example await api.get('/users/all')
   */
  get<K = unknown>(url: URL, ...middleware: Middleware[]): Promise<K> {
    const requestMiddleware = [...this.middleware, ...middleware]
    const options = { method: RestMethods.GET }
    return this._fetch<K>(url, options, requestMiddleware)
  }

  /**
   * @param url Relative url to base url provided in the constructor. Represents
   * the 'endpoint' you are routing to
   * @param payload Payload data that is send back to the API in request.body
   * @param middleware Optional middleware functions, only applied to this request
   * @returns The response, after all middleware has been applied
   * @example await api.put('/users/update', { name: 'Bar' })
   */
  put<K = unknown>(
    url: URL,
    payload: object,
    ...middleware: Middleware[]
  ): Promise<K> {
    const requestMiddleware = [...this.middleware, ...middleware]
    const options = {
      body: JSON.stringify(payload),
      method: RestMethods.PUT,
    }
    return this._fetch<K>(url, options, requestMiddleware)
  }

  /**
   * @param url Relative url to base url provided in the constructor. Represents
   * the 'endpoint' you are routing to
   * @param payload Payload data that is send back to the API in request.body
   * @param middleware Optional middleware functions, only applied to this request
   * @returns The response, after all middleware has been applied
   * @example await api.post('/users/new', { name: 'Foo', age: 30 })
   */
  post<K = unknown>(
    url: URL,
    payload: object,
    ...middleware: Middleware[]
  ): Promise<K> {
    const requestMiddleware = [...this.middleware, ...middleware]
    const options = {
      body: JSON.stringify(payload),
      method: RestMethods.POST,
    }
    return this._fetch<K>(url, options, requestMiddleware)
  }

  /**
   * @param url Relative url to base url provided in the constructor. Represents
   * the 'endpoint' you are routing to
   * @param payload Payload data that is send back to the API in request.body
   * @param middleware Optional middleware functions, only applied to this request
   * @returns The response, after all middleware has been applied
   * @example await api.delete('/users', { id: 123 })
   */
  delete<K = unknown>(
    url: URL,
    payload: object,
    ...middleware: Middleware[]
  ): Promise<K> {
    const requestMiddleware = [...this.middleware, ...middleware]
    const options = {
      body: JSON.stringify(payload),
      method: RestMethods.DELETE,
    }
    return this._fetch<K>(url, options, requestMiddleware)
  }

  /**
   * Applies this.middleware array of functions to
   * the data obbject provided
   * @param response Data object to apply the middleware to
   * @returns The response, after all middleware has been applied
   */
  private async _applyMiddleware<K>(
    response: Response,
    middleware: Middleware<K, unknown>[],
  ): Promise<K> {
    let currentData: Response | unknown = response

    for (let index = 0; index < middleware.length; index += 1) {
      currentData = await middleware[index](currentData as K)
      logger.debug('applied middleware:', middleware[index].name)
    }

    return currentData as unknown as Promise<K>
  }

  /**
   * Wrapper around the native fetch. Applies options and middleware
   * and returns a Promise
   * @param url Endpoint to be appended to baseUrl provided in the contructor
   * @param options Request options, in this case they come from one of the
   * supported REST methods in this class
   * @returns The response, after all middleware has been applied
   */
  private async _fetch<K>(
    url: URL,
    options: object,
    middleware: Middleware[],
  ): Promise<K> {
    let combinedHeaders = [...this.headers]
    if (this.auth !== undefined) {
      combinedHeaders = [...combinedHeaders, ...this.auth.getHeaders()]
    }

    try {
      const response = await fetch(url, {
        headers: combinedHeaders,
        ...options,
      })
      return this._applyMiddleware<K>(response, middleware)
    } catch (error: unknown) {
      logger.debug(error)
      throw error
    }
  }
}
