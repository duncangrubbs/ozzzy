import { Middleware } from '../ozzy';

/**
 * Checks the status code of a given response
 * @param response Incoming data from the API
 * @returns Call to next middleware handler
 * @throws Error if response code is >= 300
 */
export function checkStatus(
  response: Response,
  next: Middleware<any>
): Promise<any> {
  console.log('here in the error middleware');
  if (response.status >= 200 && response.status < 300) {
    return next(response);
  }

  return (
    response
      .json()
      // you could catch this somewhere else and handle it how you like
      .then((result: any) => Promise.reject(result.error))
  );
}
