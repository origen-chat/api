export type Nullable<T> = T | null;

export type Undefinable<T> = T | undefined;

export type Mutable<T> = { -readonly [K in keyof T]: T[K] };

export type Base64 = string;
