import { Middleware } from '../ozzy';

/**
 *
 * @param response Incoming data from previous middleware or API
 * In this specific case we are expecting data of the type Response
 * since this type includes the json() function by default
 * @param next Next middleware handler function
 * @returns Call to next middleware handler
 */
export function toJson(
  response: Response,
  next: Middleware<any>
): Promise<any> {
  console.log('here in the json middleware');
  return response.json().then((result: any) => next(result));
}
