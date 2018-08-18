import { NonNegativeInteger, PositiveInteger } from './numbers';

export type ID = PositiveInteger;

export type Email = string;

export type Timestamp = NonNegativeInteger;

export type Timestamps = Readonly<{
  insertedAt: Timestamp;
  updatedAt: Timestamp;
}>;

export type Identifiable<TID = ID> = Readonly<{
  id: TID;
}>;
