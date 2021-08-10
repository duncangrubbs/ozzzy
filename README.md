![CI](https://github.com/duncangrubbs/ozzy/workflows/CI/badge.svg?event=push)
# ozzy
> A lightweight, modular, REST API middleware boilerplate

Ozzy is an API middleware boilerplate that seamlessly connects your web components to your APIs, with configurable options and powerful features. For now it is just a boilerplate, rather than a library, and therefore entirely configurable. Checkout this [blog post](https://duncangrubbs.surge.sh/blog/oct012020) if you're curious about the inspiration and goals behind the project.

With the minimum amount of configuration, it provides smooth error handling and local token storage and parsing with the providers of your choice. You can think of Ozzy as a starter kit for building abritray complexity into your middlware. The codebase encourages customization to be modularized and testable, and follow a clean architecture. If you are building a web app with a modern framework, you can use Ozzy as place to start. Even in a small app, abstracting away things like error handling, data parsing and setting headers can save you a lot of time.

## 🤝 Design Principles
1. Lightweight -- _Keep it small, why not?_
2. Easy to Use -- _Simple, straightforward, well-documented functions_
3. Zero Dependencies -- _Outside of the test suite (and a linter), there are no dependencies, so you can get up and running fast in any project_
4. Framework Agnostic -- _Works with any framework, yay for Vanilla JS!_

## 🔨 Codebase
- The codebase is made up of a few core classes, plus a file to store constants.
  - `ApiService.js` -- Core class that almost all API requests should pass through
    - `GET`, `POST`, `PUT`, `DELETE` functions that take a URL, optional data, and an optional auth flag that specifies whether or not to pass along the locally persisted token
    - This also 'hydrates' Javascript date objects that were serialized as strings during transport
  - `AuthService.js` -- All authentication related functionality is here
    - `loggedIn`, `isAdmin`, `logout`, functions handle parsing and removing locally persisted tokens
    - `setToken` and `getToken` functions are used internally to interface with the storage provider
  - `ErrorService.js` -- Parsers errors and returns an HTML element to be rendered to the user
    - `parseError`, only used internally by the other classes
  - `Error.js` -- Builds and styles the error component
    - Can be modified to style the error component that is returned
  - `Storage.js` -- Storage provider abstraction, depending on what provider you use, you will need to update this. (Redux, localStorage, etc.)
    - Abstracts away the persistant storage mechanism, so it can be easily updated globally
  - `TokenService.js` -- Token parser abstraction, depending on what library you use, you will need to update this. (JWT, etc.)
    - Abstracts away the token parsing mechanism, so it can be easily updated globally
  - `constants.js` -- Basic constant declarations, and project configuration options
- To get started you should read through the code and at least update `constants.js` to fit with your API

### `ApiService` Example Use
```javascript
const { BASE_API_URL } = require('../ozzy/constants');
const Api = require('../ozzy/ApiService');

// ...

function fetchData() {
  // here we are sending a request with an authorization header
  Api
    .GET(`${BASE_API_URL}/users/all`, true)
    .then((users) => {
      setUsers(users);
    })
    // here error is an html element, so you can append it directly into the DOM
    .catch((error) => appendErrorChild(error))
}

// ...
```

### `AuthService` Example Use
```javascript
const { BASE_API_URL } = require('../ozzy/constants');
const AuthService = require('../ozzy/AuthService');
const Api = require('../ozzy/ApiService');

// ...

function login() {
  Api
    .POST(`${BASE_API_URL}/login`, credentials)
    .then((token) => {
      AuthService.setToken(token);
    })
    .catch((error) => appendErrorChild(error))
}

// ...
```

## 🙌 Contributing
Feel free to fork and make PRs, they are always welcome! There is a lot of work to do on this project and any help is appreciated. If you don't know where to start you can check out the [issues](https://github.com/duncangrubbs/ozzy/issues) page. I also plan to make a migrate the project to Typescript on a new branch at some point.
