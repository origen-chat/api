import { Workspace } from '../workspaces';
import { getSubscriptionByWorkspace } from '../subscriptions/get';
import { DBOptions } from '../types';
import { updateSubscriptionQuantityInStripe } from '../subscriptions';
import { getWorkspaceBillableMemberCount } from './workspaceMemberships';

export type MaybeUpdateSubscriptionQuantityInStripeArgs = Readonly<{
  workspace: Workspace;
}>;

export async function maybeUpdateSubscriptionQuantityInStripe(
  args: MaybeUpdateSubscriptionQuantityInStripeArgs,
  options: DBOptions = {},
): Promise<void> {
  const subscription = await getSubscriptionByWorkspace(
    args.workspace,
    options,
  );

  if (!subscription) {
    return;
  }

  const billableMemberCount = await getWorkspaceBillableMemberCount(
    args.workspace,
    options,
  );

  if (billableMemberCount === subscription.stripeSubscriptionData.quantity) {
    return;
  }

  updateSubscriptionQuantityInStripe({
    subscription,
    quantity: billableMemberCount,
  });
}
