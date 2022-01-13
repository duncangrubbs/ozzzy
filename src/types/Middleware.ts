export type Middleware<T> = (data: T, next?: any) => Promise<any>;
