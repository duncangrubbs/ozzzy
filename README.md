# ozzy
> A lightweight, modular, REST API middleware boilerplate

Ozzy is an API middleware boilerplate that seamlessly connects your client-side components to your API, with configurable options and powerful features. For now it is just a boilerplate, rather than a library, and therefore entirely configurable. Checkout the [blog post](https://duncangrubbs.surge.sh/blog/oct012020) about the inspiration and goals behind the project.

With the minimum amount of configuration, it provides smooth error handling and local token storage and parsing with the provider of your choice. You can think of Ozzy as a starter kit for building abritray complexity into your middlware. The codebase encourages customization to be modularized and testable, and follow a clean architecture.

## 🤝 Design Principles
1. Lightweight -- _Keep it small, why not?_
2. Easy to Use -- _Simple, straightforward, well-documented functions_
3. Zero Dependencies -- _Outside of the test suite, there are no dependencies, so you can get up and running fast in any project_
4. Framework Agnostic -- _Works with any framework, yay for Vanilla JS!_

## 🔨 Codebase
- The codebase is made up of a few core classes, plus a file to store constants.
  - `API.js` -- Core class that almost all API requests should pass through
    - `GET`, `POST`, `PUT`, `DELETE` functions that take a URL, optional data, and an optional auth flag that specifies whether or not to pass along the locally persisted token
  - `AuthService.js` -- All authentication related functionality is here
    - `loggedIn`, `isAdmin`, `logout`, functions handle parsing and removing locally persisted tokens
    - `set` and `get` functions are used internally to interface with the storage provider
  - `ErrorService.js` -- Parsers errors and returns an HTMLElement to be rendered to the user
    - `parseError`, only used internally but the other classes
    - Can be modified to style the error component that is returned
  - `Storage.js` -- Storage provider abstraction, depending on what provider you use, you will need to update this. (Redux, localStorage, etc.)
    - Abstracts away the persistant storage mechanism, so it can be easily updated
  - `constants.js` -- Basic constant declarations, and other options
- You should read through the code and at least update `constants.js` to fit with your API

### Example Usage
```javascript
const API = require('./API');

// ...

function fetchData() {
  API.GET(`${constants.BASE_API_URL}/users/all`, true)
    .then((data) => {
      this.setState({ data });
    })
    .catch((error) => {
      const errorWrapper = document.getElementById('error-wrapper');
      errorWrapper.appendChild(error);
    })
}

// ...
```

## 🙌 Contributing
Feel free to fork and make PRs, they are always welcome! There is a lot of work to do on this project and any help is appreciated. If you don't know where to start you can check out the [issues](https://github.com/duncangrubbs/ozzy/issues) page.
