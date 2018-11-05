import Stripe from 'stripe';

import { env } from '../../config';

export const stripe = new Stripe(env.stripeSecretKey);

export default stripe;
