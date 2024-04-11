/**
 * Parses the incoming data as JSON
 * @param response Incoming data from previous middleware or API
 * In this specific case we are expecting data of the type Response
 * since this type includes the json() function by default
 * @param next Next middleware handler function
 * @returns Call to next middleware handler
 */
export function toJson(response: Response): Promise<any> {
  return response.json()
}
