export type Nullable<TType> = TType | null;

export type Undefinable<TType> = TType | undefined;

export type Mutable<TType> = { -readonly [TKey in keyof TType]: TType[TKey] };

export type Omit<TType, TKeys> = Pick<TType, Exclude<keyof TType, TKeys>>;

export type Base64 = string;
