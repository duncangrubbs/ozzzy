import Api from './Api';
import Auth from './Auth';
import { hydrateDates } from './middleware/dates';

const baseUrl = 'https://jsonplaceholder.typicode.com';

const api = new Api(
  baseUrl,
  new Auth(),
  'data_here',

  // apply your middleware here
  hydrateDates
);

api.get('/todos/1').then((data) => console.log(data));
