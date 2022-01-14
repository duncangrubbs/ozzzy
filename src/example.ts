import { checkStatus } from './middleware/error-handler';
import { toJson } from './middleware/json';
import { logger } from './middleware/logger';
import { Api, Auth, hydrateDates } from './ozzy';

const baseUrl = 'https://jsonplaceholder.typicode.com';

type ApiResponse = {
  userId: object;
  id: string;
  title: string;
  completed: boolean;
};

const api = new Api<ApiResponse>(
  baseUrl,
  new Auth(),

  /*
  You can apply your middleware here. For example
  this is a middleware that parses dates that have
  been serialized as strings when put into JSON. This
  way when you start working with your dates you have immediate
  access to the native JS Date() objects
  */
  logger,
  checkStatus
);

/* 
You can also apply middleware using the .use() function, similar
to Express.js
*/
api.use(toJson);
api.use(hydrateDates);

function sampleMiddleware(data: any, next: any) {
  console.log('here in the dummy middleware');
  return next(data);
}

/*
You can also apply middleware at the request level for more specific
data modifications you need
*/
api
  .get('/todos/1', sampleMiddleware)
  .then((data: ApiResponse) => console.log(data))
  .catch((error: any) => console.error(error));
