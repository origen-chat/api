import { ConfigError } from './errors';
import { GetEnvOrThrowOptions, ValueType } from './types';

const defautlGetEnvOrThrowOptions: GetEnvOrThrowOptions = {
  valueType: 'string',
};

export const getEnvOrThrow = (
  key: string,
  options: GetEnvOrThrowOptions = defautlGetEnvOrThrowOptions,
): string | number | boolean => {
  const value = process.env[key];

  if (!value) {
    if (!options.defaultValue) {
      throw new ConfigError(`${key} not set`);
    } else {
      return options.defaultValue;
    }
  }

  return castValue(value, options.valueType);
};

export const castValue = (
  value: string,
  type: ValueType = 'string',
): string | number | boolean => {
  if (type === 'boolean') {
    return !!value;
  }

  if (type === 'number') {
    return parseInt(value, 10);
  }

  return value;
};
