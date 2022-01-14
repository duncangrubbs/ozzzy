// regex that matches patterns from
// JSON.stringify(new Date())
const dateFormat = /^-?\d+-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

function hydrator(key: string, value: any) {
  if (typeof value === 'string' && dateFormat.test(value)) {
    return new Date(value);
  }

  return value;
}

/**
 * Hydrates stringified date objects coming from an API
 * @param data Incoming data from the API or previous middleware handler
 * Note that this data is expected to be a Javascript object
 * @param next Next middleware handler function
 * @returns Call to next middleware handler
 */
export function hydrateDates(data: object, next: any): Promise<any> {
  console.log('here in the date middleware');
  const dataAsString = JSON.stringify(data);
  const hydratedData = JSON.parse(dataAsString, hydrator);

  return next(hydratedData);
}
