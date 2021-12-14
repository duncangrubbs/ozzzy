import Api from './Api';
import Auth from './Auth';
import { hydrateDates } from './middleware/dates';

const baseUrl = 'https://jsonplaceholder.typicode.com';

const api = new Api(
  baseUrl,
  new Auth(),

  /*
  You can apply your middleware here. For example
  this is a middleware that parses dates that have
  been serialized as strings when put into JSON. This
  way when you start working with your dates you have immediate
  access to the native JS Date() objects
  */
  hydrateDates
);

function sampleMiddleware(data: any, next: any) {
  console.log('here in the second middleware');
  return next(data);
}

/*
You can also apply middleware at the request level for more specific
data modifications you need
*/
api.get('/todos/1', sampleMiddleware).then((data) => console.log(data));
