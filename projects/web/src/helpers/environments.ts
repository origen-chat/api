import { env } from '../config';

export const isDevelopmentEnvironment = env.nodeEnvironment === 'development';

export const isProductionEnvironment = env.nodeEnvironment === 'production';
