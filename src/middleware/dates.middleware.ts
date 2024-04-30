// regex that matches patterns from
// JSON.stringify(new Date())
const dateFormat = /^-?\d+-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/

/**
 * From JSON.parse:
 * A function that transforms the results.
 * This function is called for each member of the object.
 * If a member contains nested objects, the nested objects are transformed before the parent object is.
 *
 * Provided an object key-value pair, attempts to
 * match values of type "string" against an ISO date
 * string regex.
 *
 * If there is a match, it returns the value as a date,
 * if not, it returns the value as is
 */
function dateReviver(_key: string, value: any) {
  if (typeof value === 'string' && dateFormat.test(value)) {
    return new Date(value)
  }

  return value
}

/**
 * Hydrates stringified date objects coming from an API
 * @param data Incoming data from the API or previous middleware handler
 * Note that this data is expected to be a Javascript object
 * @returns Hydrated data object
 */
export function hydrateDates(data: object): Promise<any> {
  const dataAsString = JSON.stringify(data)
  const hydratedData = JSON.parse(dataAsString, dateReviver)

  return hydratedData
}
