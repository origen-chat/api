import { resolver as bookmarkableResolver } from '../Bookmarkable';
import { resolver as channelResolver } from '../Channel';
import { resolver as cursorResolver } from '../Cursor';
import { resolver as emailResolver } from '../Email';
import { resolver as mutationResolver } from '../Mutation';
import { resolver as nodeResolver } from '../Node';
import { resolver as nonNegativeIntResolver } from '../NonNegativeInt';
import { resolver as queryResolver } from '../Query';
import { resolver as reactableResolver } from '../Reactable';
import { resolver as subscriptionResolver } from '../Subscription';
import { resolver as userResolver } from '../User';
import { resolver as workspaceResolver } from '../Workspace';

const resolvers = {
  Query: queryResolver,
  Mutation: mutationResolver,
  Subscription: subscriptionResolver,
  Node: nodeResolver,
  User: userResolver,
  Email: emailResolver,
  Cursor: cursorResolver,
  NonNegativeInt: nonNegativeIntResolver,
  Workspace: workspaceResolver,
  Channel: channelResolver,
  Reactable: reactableResolver,
  Bookmarkable: bookmarkableResolver,
};

export default resolvers;
