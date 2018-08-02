import { ConfigError } from './errors';
import { GetEnvOrThrowOptions, ValueType } from './types';

export function getEnvOrThrow(
  key: string,
  options: GetEnvOrThrowOptions,
): string | number | boolean {
  const value = process.env[key];

  if (!value) {
    if (options.defaultValue === undefined) {
      throw new ConfigError(`${key} not set`);
    } else {
      return options.defaultValue;
    }
  }

  return castValue(value, options.valueType);
}

export function castValue(
  value: string,
  type: ValueType,
): string | number | boolean {
  if (type === 'boolean') {
    return !!value;
  }

  if (type === 'number') {
    return parseInt(value, 10);
  }

  return value;
}
