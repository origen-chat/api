import { resolver as channelResolver } from '../Channel';
import { resolver as emailResolver } from '../Email';
import { resolver as mutationResolver } from '../Mutation';
import { resolver as nodeResolver } from '../Node';
import { resolver as queryResolver } from '../Query';
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
  Workspace: workspaceResolver,
  Channel: channelResolver,
};

export default resolvers;
