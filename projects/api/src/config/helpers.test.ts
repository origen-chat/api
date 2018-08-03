import { castValue, getEnvOrThrow } from './helpers';

describe('getEnvOrThrow', () => {
  afterEach(() => {
    restoreProcessEnv();
  });

  test('throws when environmental variable is not set', () => {
    const name = 'TEST_ENV';
    const testProcessEnv: NodeJS.ProcessEnv = {};
    mockProcessEnv(testProcessEnv);

    expect(() => getEnvOrThrow(name, { valueType: 'string' })).toThrow();
  });

  test("doesn't throw when environmental variable is set", () => {
    const name = 'TEST_ENV';
    const value = 'test';
    const testProcessEnv: NodeJS.ProcessEnv = { [name]: value };
    mockProcessEnv(testProcessEnv);

    expect(() => getEnvOrThrow(name, { valueType: 'string' })).not.toThrow();
  });

  test('returns default value when environmental variable is not set', () => {
    const name = 'TEST_ENV';
    const testProcessEnv: NodeJS.ProcessEnv = {};
    mockProcessEnv(testProcessEnv);

    const defaultValue = 'default';
    const result = getEnvOrThrow(name, { valueType: 'string', defaultValue });

    expect(result).toBe(defaultValue);
  });

  test("doesn't return default value when environmental variable is set", () => {
    const name = 'TEST_ENV';
    const value = 'test';
    const testProcessEnv: NodeJS.ProcessEnv = { [name]: value };
    mockProcessEnv(testProcessEnv);

    const defaultValue = 'default';
    const result = getEnvOrThrow(name, { valueType: 'string', defaultValue });

    expect(result).not.toBe(defaultValue);
    expect(result).toBe(value);
  });
});

describe('castValue', () => {
  test("returns a string when the second argument is 'string'", () => {
    const value = 'test';
    const type = 'string';

    const castedValue = castValue(value, type);

    expect(typeof castedValue).toBe('string');
  });

  test(`returns true when the first argument is truthy and
  the second argument is 'boolean'`, () => {
    const value = 'test';
    const type = 'boolean';

    const castedValue = castValue(value, type);

    expect(castedValue).toBe(true);
  });

  test(`returns false when the first argument is truthy and
  the second argument is 'boolean'`, () => {
    const value = '';
    const type = 'boolean';

    const castedValue = castValue(value, type);

    expect(castedValue).toBe(false);
  });

  test("returns a number when the second argument is 'number'", () => {
    const value = '42';
    const type = 'number';

    const castedValue = castValue(value, type);

    expect(typeof castedValue).toBe('number');
  });
});

const savedProcessEnv: NodeJS.ProcessEnv = { ...process.env };

const mockProcessEnv = (newEnvObject: NodeJS.ProcessEnv) => {
  process.env = newEnvObject;
};

const restoreProcessEnv = () => {
  process.env = savedProcessEnv;
};
