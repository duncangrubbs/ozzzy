// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Middleware<K = any, V = any> = (data: K) => Promise<V>
