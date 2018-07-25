export type GetEnvOrThrowOptions = {
  readonly defaultValue?: string | number | boolean;
  readonly valueType?: ValueType;
};

export type ValueType = 'string' | 'number' | 'boolean';
