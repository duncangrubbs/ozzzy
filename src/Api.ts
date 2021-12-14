const fetch = require('node-fetch');

import RestMethods from './enums/RestMethods';
import Auth from './Auth';
import { Middleware } from './enums/Middleware';

class Api {
  baseUrl: string;
  auth: Auth;
  dataField: string;
  middleware: Middleware[];

  constructor(
    baseUrl: string,
    auth: Auth,
    dataField: string,
    ...middleware: Middleware[]
  ) {
    this.middleware = middleware;
    this.baseUrl = baseUrl;
    this.auth = auth;
    this.dataField = dataField;
  }

  get(url: string): Promise<any> {
    const options = { method: RestMethods.GET };
    return this.fetch(url, options);
  }

  put(url: string, payload: any): Promise<any> {
    const options = {
      body: JSON.stringify({ [this.dataField]: payload }),
      method: RestMethods.PUT,
    };
    return this.fetch(url, options);
  }

  post(url: string, payload: any): Promise<any> {
    const options = {
      body: JSON.stringify({ [this.dataField]: payload }),
      method: RestMethods.POST,
    };
    return this.fetch(url, options);
  }

  delete(url: string, payload: any): Promise<any> {
    const options = {
      body: JSON.stringify({ [this.dataField]: payload }),
      method: RestMethods.DELETE,
    };
    return this.fetch(url, options);
  }

  private applyMiddleware(data: any) {
    let index = 0;
    const nextHandler = (newData: any) => {
      index++;
      if (index >= this.middleware.length) {
        return newData;
      }
      return this.middleware[index](newData, nextHandler);
    };
    return this.middleware[index](data, nextHandler);
  }

  private fetch(url: string, options: any): Promise<any> {
    return (
      fetch(`${this.baseUrl}${url}`, {
        headers: this.auth.getHeaders(),
        ...options,
      })
        .then((data: any) => data.json())
        // TODO: support promises in middleware
        .then((data: any) => this.applyMiddleware(data))
        .catch((error: any) => console.log(error))
    );
  }
}

export default Api;
