const dateFormat = /^-?\d+-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

function hydrator(key: string, value: any) {
  if (typeof value === 'string' && dateFormat.test(value)) {
    return new Date(value);
  }

  return value;
}

export function hydrateDates(data: any, next: any) {
  const dataAsString = JSON.stringify(data);
  const hydratedData = JSON.parse(dataAsString, hydrator);
  hydratedData['hello'] = 'world';
  console.log('here we are in the middleware');

  return next(hydratedData);
}
