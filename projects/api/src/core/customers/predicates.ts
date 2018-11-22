import { Customer } from './types';

export function isCustomer(value: any): value is Customer {
  return (
    typeof value === 'object' && value && value.userId && value.stripeCustomerId
  );
}
