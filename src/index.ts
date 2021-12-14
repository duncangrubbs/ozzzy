import Api from './Api';
import Auth from './Auth';
import { hydrateDates } from './middleware/dates';

const baseUrl = 'https://jsonplaceholder.typicode.com';

const api = new Api(
  baseUrl,
  new Auth(),
  'data_here',

  /*
  You can apply your middleware here. For example
  this is a middleware that parses dates that have
  been serialized as strings when put into JSON. This
  way when you start working with your dates you have immediate
  access to the native JS Date() objects
  */
  hydrateDates
);

api.get('/todos/1').then((data) => console.log(data));
