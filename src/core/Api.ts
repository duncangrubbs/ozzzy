import RestMethods from '../enums/RestMethods'
import { Middleware } from '../types/Middleware'
import { logger } from '../utils/logger'
import Auth from './Auth'

class Api {
  baseUrl: string
  auth: Auth
  headers: Array<Array<string>> = []
  middleware: Middleware<any, any>[]

  /**
   * Constructs an instance of the Api class
   * @param baseUrl URL that is prepended to every call made to this service
   * @param auth Instance of Auth that will be applied to requests made with this
   * service
   * @param middleware Any middleware functions that will be applied at the service
   * level rather than the request level. These are meant to be global actions.
   */
  constructor(
    baseUrl: string = '',
    auth: Auth,
    headers: Array<Array<string>> = [],
    ...middleware: Middleware<any, any>[]
  ) {
    this.middleware = middleware
    this.baseUrl = baseUrl
    this.auth = auth
    this.headers = headers
  }

  /**
   * Builds a URL with query params using the native platform
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
   * Adds a middleware to be applied at the service level, class instance
   * @param middleware Middleware function you want to apply at the
   * service level
   */
  use(middleware: Middleware<any, any>): void {
    this.middleware.push(middleware)
  }

  /**
   *
   * @param url Relative url to base url provided in the constructor. Represents
   * the 'endpoint' you are routing to
   * @param middleware Optional middleware functions to be applied to the response data
   * @returns Response data from the request
   */
  get<K = any>(url: URL, ...middleware: Middleware<any, any>[]): Promise<K> {
    this.middleware.push(...middleware)
    const options = { method: RestMethods.GET }
    return this.fetch<K>(url, options)
  }

  /**
   *
   * @param url Relative url to base url provided in the constructor. Represents
   * the 'endpoint' you are routing to
   * @param payload Payload data that is send back to the API in request.body
   * @param middleware Optional middleware functions to be applied to the response data
   * @returns Response data from the request
   */
  put<K = any>(
    url: URL,
    payload: any,
    ...middleware: Middleware<any, any>[]
  ): Promise<K> {
    this.middleware.push(...middleware)
    const options = {
      body: JSON.stringify(payload),
      method: RestMethods.PUT,
    }
    return this.fetch<K>(url, options)
  }

  /**
   *
   * @param url Relative url to base url provided in the constructor. Represents
   * the 'endpoint' you are routing to
   * @param payload Payload data that is send back to the API in request.body
   * @param middleware Optional middleware functions to be applied to the response data
   * @returns Response data from the request
   */
  post<K = any>(
    url: URL,
    payload: any,
    ...middleware: Middleware<any, any>[]
  ): Promise<K> {
    this.middleware.push(...middleware)
    const options = {
      body: JSON.stringify(payload),
      method: RestMethods.POST,
    }
    return this.fetch<K>(url, options)
  }

  /**
   *
   * @param url Relative url to base url provided in the constructor. Represents
   * the 'endpoint' you are routing to
   * @param payload Payload data that is send back to the API in request.body
   * @param middleware Optional middleware functions to be applied to the response data
   * @returns Response data from the request
   */
  delete<K = any>(
    url: URL,
    payload: any,
    ...middleware: Middleware<any, any>[]
  ): Promise<K> {
    this.middleware.push(...middleware)
    const options = {
      body: JSON.stringify(payload),
      method: RestMethods.DELETE,
    }
    return this.fetch<K>(url, options)
  }

  /**
   * Applies this.middleware array of functions to
   * the data obbject provided
   * @param data Data object to apply the middleware to
   * @returns Data that has gone through all middleware functions
   */
  private async _applyMiddleware<K>(data: Response): Promise<K> {
    let currentData = data

    for (let index = 0; index < this.middleware.length; index += 1) {
      currentData = await this.middleware[index](currentData)
      logger.debug('applied middleware:', this.middleware[index].name)
    }

    return currentData as unknown as Promise<K>
  }

  /**
   * Wrapper around the built in fetch function. Applies options and middleware
   * and returns a Promise
   * @param url Endpoint to be appended to baseUrl provided in the contructor
   * @param options Request options, in this case they come from on of the
   * supported REST methods in this class
   * @returns Response data, after all the middleware has been applied
   */
  private fetch<K>(url: URL, options: any): Promise<K> {
    const combinedHeaders = [...this.headers, ...this.auth.getHeaders()]
    return fetch(url, {
      headers: combinedHeaders,
      ...options,
    })
      .then((response: Response) => this._applyMiddleware<K>(response))
      .catch((error: any) => Promise.reject(error))
  }
}

export default Api
