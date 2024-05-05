[![Tests](https://github.com/duncangrubbs/ozzy/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/duncangrubbs/ozzy/actions/workflows/main.yml)

# 🦘 ozzzy

> A small, easy to compose, HTTP API interface

Ozzzy is a interface for interacting with HTTP APIs from Javascript clients. It is essentially a stripped down version of [axios](https://axios-http.com) with the inclusion of a middleware feature similar to [Express](https://expressjs.com/) middleware and [axios interceptors](https://axios-http.com/docs/interceptors).

## 🤝 Design Principles

1. Simple
2. Configurable
3. Zero Dependencies
4. Framework Agnostic

## 🔨 Docs

### REST Methods

Ozzzy is similar to [axios](https://axios-http.com/docs/intro) in that is provides a core set of functions for making HTTP requests. You start by constructing an `HttpApi` for a specific backend service that your client needs to interact with. For example

```typescript
import { HttpApi } from 'ozzzy'

const userService = new HttpApi('/api/v1/users')
```

All the arguments to the constructor are optional, but you can provide a base URL if HTTP requests made with this service have one in common. You can also optionally pass a AuthProvider implementation, a set of shared headers, and a set of middleware functions.

This service now has a similar API to axios. For example to make a `GET` request

```typescript
import { handleErrors } from 'ozzzy'

try {
  const userResponse = await userService.get<ResponseType>(
    '/region/europe',
    handleErrors,
  )
} catch (error) {
  console.error(error)
}
```

Under the hood this builds the request headers and options, sends the fetch request, applies all of your middleware functions to the response and returns you the final result. Ozzzy supports `GET`, `PUT`, `POST`, and `DELETE`. For REST requests that support a body payload, you can pass any JSON serializable object as part of the request. For example

```typescript
const newUser = await userService.post<User>('/users/new', { name: 'Jane' })
```

### Auth

To send an authorization HTTP header, you could simply build the header and pass it to the `HttpApi` constructor. That being said, it's recommended to either use the `OzzzyAuth` provider, or write your own provider that implements the `AuthProvider` interface. This way, different instances of `Api` can share the same `AuthProvider` instance. If you use `OzzzyAuth`, it supports a few basic auth schemes out of the box like `Bearer` and `Basic`. To use an `AuthProvider` instance, pass it to the constructor like so

```typescript
import { HttpApi, OzzzyAuth, AuthTypes } from 'ozzzy'

const auth = new OzzzyAuth(AuthTypes.Bearer, userToken, 'Authorization')

const service = new HttpApi('/api/v1', auth)
```

This code configures the service to send the provided token in the `Authorization` header. The `AuthType` determines the format of this header. In this case the header would look like

```
Authorization: Bearer YOUR_TOKEN
```

### Middleware

At the core of Ozzzy is the concept of middleware. This can be applied at the service level or the request level. Middleware intercepts the `Response` object, does something to it, and then passes it to the next middleware. It is important to keep in mind that order matters.

```typescript
const middlewareOne = async (data) => {
  // do something to the response data
  // of all requests made with this service
  return data
}

const myService = new HttpApi('/api/v1', undefined, [], middlewareOne)

const middlewareTwo = async (data) => {
  // do something to the response data that is
  // specific to this request
  return data
}

const data = await myService.get('/foo/bar', middlewareTwo)
```

For those of you who have written a lot of Javascript, you are probably familiar with writing something like this

```javascript
fetch('https://some-url', headers, ...options)
  // check the response status code
  .then((response) => checkStatus(response))
  // parse as json
  .then((response) => response.json())
// finally return the response
```

With Ozzzy, you can write a middleware function once, and then apply it at the service level or request level. Out of convenience, Ozzzy comes with a few middlewares out of the box. Of course it is your choice if you want to apply these middlewares, but they are already written so that you do not have write them yourself. These include a middleware to parse the response as JSON, a basic logger, and a middleware to check the status code of the response and reject the promise if the `Response.ok` field is `false`.

## Testing Locally

If you are interesting in running the example file locally, you can simply run `npm i` and then `npm run example`. This example hit the sample JSON API and applies a variety of middlewares.

## 🙌 Contributing

Feel free to fork and make PRs, they are always welcome! There is a lot of work to do on this project and any help is appreciated. If you don't know where to start you can check out the [issues](https://github.com/duncangrubbs/ozzy/issues) page.
