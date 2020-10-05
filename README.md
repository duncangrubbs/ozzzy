# ozzy
> A lightweight, modular, REST API middleware boilerplate

Ozzy is a boilerplate for an API middleware that seamlessly connects your client-side components to your API, with configurable options and powerful features. For now tt is just a boilerplate, rather than a library, and therefore entirely configurable. Checkout the [blog post](https://duncangrubbs.surge.sh/blog/oct012020)
about the inspiration and goals behind the project.

With the minimum amount of configuration, it provides smooth error handling provided API responses contain an `error` field when parsed as JSON. It also provides local token storage and parsing with the provider of your choice.

## 🤝 Design Principles
1. Lightweight
2. Easy to Use
3. Zero Dependencies
4. Framework Agnostic

## 💻 How to Use
- The codebase is made up of a few core classes, plus a config file.
  - `FetchService.js` -- Core class that almost all API requests should pass through
  - `AuthService.js` -- All authentication related requests to the API or otherwise go through here
  - `ErrorService.js` -- Parsers errors and returns a nice HTMLElement to
  be rendered to the user
  - `Storage.js` -- Storage provider abstraction, depending on what provider you use, you will need to update this. (Redux, localStorage, etc.)
  - `config.js` -- Basic constant declarations, and other options
- You should read through the code and certainly update `config.js`

### Example
```javascript
const FetchService = require('./FetchService');

// ...

componentDidMount() {
  FetchService.GET('https://myapi.com/users/all')
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
