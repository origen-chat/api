import stream from 'stream';

import { NonNegativeInteger, PositiveInteger } from './numbers';

export type ID<TID = PositiveInteger> = TID;

export type Email = string;

export type URL = string;

export type HTML = string;

export type Timezone = string;

export type Timestamp = NonNegativeInteger;

export type Timestamps = InsertedAtField & UpdatedAtField;

export type InsertedAtField = Readonly<{
  insertedAt: Date;
}>;

export type UpdatedAtField = Readonly<{
  updatedAt: Date;
}>;

export type Identifiable<TID = PositiveInteger> = Readonly<{
  id: ID<TID>;
}>;

export enum Locale {
  En = 'en',
}

export type FileUpload = Readonly<{
  stream: stream.Readable;
  filename: string;
  mimetype: string;
  encoding: string;
}>;
