export type Nullable<TType> = TType | null;

export type Undefinable<TType> = TType | undefined;

export type Mutable<TType> = { -readonly [K in keyof TType]: TType[K] };

export type Base64 = string;
