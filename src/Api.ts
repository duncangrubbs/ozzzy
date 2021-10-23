enum RestMethods {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
}

class Api {
  baseUrl: string;
  auth: Auth;
  dataField: string;

  constructor(baseUrl: string, auth: Auth, dataField: string) {
    baseUrl = this.baseUrl;
    auth = this.auth;
    this.dataField = dataField;
  }

  get(url: string) {
    const options = { method: RestMethods.GET };
    this.fetch(url, options);
  }

  put(url: string, payload: any) {
    const options = {
      body: JSON.stringify({ [this.dataField]: payload }),
      method: RestMethods.PUT
    };
    this.fetch(url, options);
  }

  post(url: string, payload: any) {
    const options = {
      body: JSON.stringify({ [this.dataField]: payload }),
      method: RestMethods.POST
    };
    this.fetch(url, options);
  }

  delete(url: string, payload: any) {
    const options = {
      body: JSON.stringify({ [this.dataField]: payload }),
      method: RestMethods.DELETE
    };
    this.fetch(url, options);
  }

  private fetch(url: string, options: any) {
    return fetch(url, {
      headers: this.auth.getHeaders(),
      ...options,
    })
      .then(data => console.log(data))
      .catch(error => console.log(error))
      .finally(() => console.log('finally'))
  }
}
