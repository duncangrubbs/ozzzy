export type Middleware<K, V> = (data: K, next?: Middleware<K, V>) => Promise<V>;
