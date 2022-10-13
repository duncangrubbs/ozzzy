/**
 * Checks the status code of a given response
 * @param response Incoming data from the API
 * @returns Call to next middleware handler
 * @throws Error if response is not ok
 */
export function checkStatus(response: Response, next: any): Promise<any> {
  console.log("[error middleware]");
  if (!response.ok) {
    return (
      response
        .json()
        // you could catch this somewhere else and handle it how you like
        .then((result: any) => Promise.reject(result.error))
    );
  }

  return next(response);
}
