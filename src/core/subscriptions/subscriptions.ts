import { Workspace } from '../workspaces';
import { DBOptions, NonNegativeInteger } from '../types';
import { getSubscriptionByWorkspace } from './get';
import stripe from '../stripe';
import { Subscription } from './types';

export async function isWorkspaceOnAPaidPlan(
  workspace: Workspace,
  options: DBOptions = {},
): Promise<boolean> {
  const subscriptions = await getSubscriptionByWorkspace(workspace, options);

  const isOnAPaidPlan = !!subscriptions;

  return isOnAPaidPlan;
}

export type UpdateSubscriptionQuantityInStripeArgs = Readonly<{
  subscription: Subscription;
  quantity: NonNegativeInteger;
}>;

export async function updateSubscriptionQuantityInStripe(
  args: UpdateSubscriptionQuantityInStripeArgs,
): Promise<void> {
  await stripe.subscriptions.update(
    args.subscription.stripeSubscriptionData.id,
    { quantity: args.quantity },
  );
}
