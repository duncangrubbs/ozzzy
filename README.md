![CI](https://github.com/duncangrubbs/ozzy/workflows/CI/badge.svg?event=push)
# ozzy
> A lightweight, modular, REST API middleware

Ozzy is a service for interacting with REST APIs from a Javascript/Typescript client. The core feature is the ability to apply middleware like you can with [Express](https://expressjs.com/).

It was origionally inspired by this [blog post](https://duncangrubbs.surge.sh/blog/oct012020) but has since been updated after more learning on my end.

If you are building a web app with a modern framework, you can use Ozzy as place to start. Even in a small app, abstracting away things like error handling, data parsing and setting headers can save you a lot of time.

## 🤝 Design Principles
1. Lightweight -- _Keep it small, why not?_
2. Easy to Use -- _Simple, straightforward, well-documented functions_
3. Zero Dependencies -- _Outside of the test suite (and a linter), there are no dependencies, so you can get up and running fast in any project_
4. Framework Agnostic -- _Works with any framework, yay for Vanilla JS/TS!_

## 🔨 Core Features
### Middleware
```javascript
const baseUrl = 'https://backend-a.coolapp.com.api/v1'

const BackendServiceA = new Api(
  baseUrl,
  new Auth(),
  'payload',

  hydrateDates,
  sanatizeStrings,
  removeMetadata,
  normalizeKeysToV2
)

api.get('/users/id/1234').then((data) => doSomething(data))
```

The main difference between Express.js and Ozzy is that you apply middleware at the `Api` class level rather than at the function level. In express you might do something like
```javascript
router.get('url', middlewares..., endHandler)
```

With Ozzy you apply the middleware at the `Api` level.
```javascript
new Api(baseUrl, new Auth(), 'payload', ...middleware);
```

## 🙌 Contributing
Feel free to fork and make PRs, they are always welcome! There is a lot of work to do on this project and any help is appreciated. If you don't know where to start you can check out the [issues](https://github.com/duncangrubbs/ozzy/issues) page. I also plan to make a migrate the project to Typescript on a new branch at some point.
