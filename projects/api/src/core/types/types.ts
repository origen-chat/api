export type ID = number;

export type Timestamp = number;

export type Timestamps = Readonly<{
  insertedAt: Timestamp;
  updatedAt: Timestamp;
}>;

export type Identifiable<TID = ID> = Readonly<{
  id: TID;
}>;

export type Nullable<T> = T | null;

export type Undefinable<T> = T | undefined;
