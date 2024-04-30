export type Middleware<K = unknown, V = unknown> = (data: K) => Promise<V>
