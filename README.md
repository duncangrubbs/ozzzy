# ozzy
> A lightweight, modular, REST API middleware boilerplate

Ozzy is a boilerplate for an API middleware that seamlessly connects your client-side components to your API, with configurable options and powerful features. For now it is just a boilerplate, rather than a library, and therefore entirely configurable. Checkout the [blog post](https://duncangrubbs.surge.sh/blog/oct012020)
about the inspiration and goals behind the project.

With the minimum amount of configuration, it provides smooth error handling provided API responses contain an `error` field when parsed as JSON. Of course this field can be changed, like anything with the boilerplate. It also provides local token storage and parsing with the provider of your choice.

## 🤝 Design Principles
1. Lightweight -- _Keep it small, why not?_
2. Easy to Use -- _Simple, straightforward, well-documented functions_
3. Zero Dependency -- _Beyond the test suite, there are no dependencies, so you can get up and running fast in any project_
4. Framework Agnostic -- _Since this is written in vanilla JS, there is no framework dependency_

## 💻 Codebase
- The codebase is made up of a few core classes, plus a constants file.
  - `FetchService.js` -- Core class that almost all API requests should pass through
    - `GET`, `POST`, `PUT`, `DELETE` functions that take a URL, and optional data
  - `AuthService.js` -- All authentication related requests to the API or otherwise go through here
    - `loggedIn`, `isAdmin`, `logout`, `set` and `get` tokens
  - `ErrorService.js` -- Parsers errors and returns a nice HTMLElement to
  be rendered to the user
    - `parseError`, only used internally but the other classes
    - Can be modified to style the error component that is returned
  - `Storage.js` -- Storage provider abstraction, depending on what provider you use, you will need to update this. (Redux, localStorage, etc.)
    - Abstracts away the persistant storage mechanism, so it can be easily updated
  - `constants.js` -- Basic constant declarations, and other options
- You should read through the code and certainly update `constants.js`

### Example
```javascript
const FetchService = require('./FetchService');

// ...

function fetchData() {
  FetchService.GET(`${constants.BASE_API_URL}/users/all`, true)
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

## 🔨 Contributing
Feel free to fork and make PRs, they are always welcome!
