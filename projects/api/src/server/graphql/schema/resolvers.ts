import { resolver as actorResolver } from '../Actor';
import { resolver as appResolver } from '../App';
import { resolver as bookmarkableResolver } from '../Bookmarkable';
import { resolver as botResolver } from '../Bot';
import { resolver as channelResolver } from '../Channel';
import { resolver as channelPrivacyResolver } from '../ChannelPrivacy';
import { resolver as channelTypeResolver } from '../ChannelType';
import { resolver as cursorResolver } from '../Cursor';
import { resolver as dateResolver } from '../Date';
import { resolver as dateTimeResolver } from '../DateTime';
import { resolver as emailResolver } from '../Email';
import { resolver as jsonResolver } from '../JSON';
import { resolver as messageResolver } from '../Message';
import { resolver as mutationResolver } from '../Mutation';
import { resolver as nodeResolver } from '../Node';
import { resolver as nonNegativeIntResolver } from '../NonNegativeInt';
import { resolver as queryResolver } from '../Query';
import { resolver as reactableResolver } from '../Reactable';
import { resolver as subscriptionResolver } from '../Subscription';
import { resolver as timeResolver } from '../Time';
import { resolver as userResolver } from '../User';
import { resolver as workspaceResolver } from '../Workspace';

const resolvers = {
  Query: queryResolver,
  Mutation: mutationResolver,
  Subscription: subscriptionResolver,
  Node: nodeResolver,
  Actor: actorResolver,
  User: userResolver,
  Email: emailResolver,
  Cursor: cursorResolver,
  JSON: jsonResolver,
  DateTime: dateTimeResolver,
  Date: dateResolver,
  Time: timeResolver,
  NonNegativeInt: nonNegativeIntResolver,
  App: appResolver,
  Bot: botResolver,
  Workspace: workspaceResolver,
  Channel: channelResolver,
  ChannelType: channelTypeResolver,
  ChannelPrivacy: channelPrivacyResolver,
  Message: messageResolver,
  Reactable: reactableResolver,
  Bookmarkable: bookmarkableResolver,
};

export default resolvers;
