/**
 * Checks the status code of a given response
 * @param response Incoming data from the API
 * @returns Call to next middleware handler
 * @throws Error if response is not ok
 */
export async function handleErrors(response: Response): Promise<Response> {
  if (response.ok) {
    return response
  }

  try {
    const result = await response.json()
    throw Error(result.error)
  } catch {
    throw Error(response.statusText)
  }
}
