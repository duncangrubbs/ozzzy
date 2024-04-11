export type Middleware<K, V> = (data: K) => Promise<V>
