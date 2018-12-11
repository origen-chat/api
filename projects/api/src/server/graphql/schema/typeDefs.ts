import { DocumentNode } from 'graphql';

import { typeDefs as actorTypeDefs } from '../Actor';
import { typeDefs as appTypeDefs } from '../App';
import { typeDefs as bookmarkTypeDefs } from '../Bookmark';
import { typeDefs as bookmarkableTypeDefs } from '../Bookmarkable';
import { typeDefs as botTypeDefs } from '../Bot';
import { typeDefs as channelTypeDefs } from '../Channel';
import { typeDefs as channelPrivacyTypeDefs } from '../ChannelPrivacy';
import { typeDefs as channelTypeTypeDefs } from '../ChannelType';
import { typeDefs as cursorTypeDefs } from '../Cursor';
import { typeDefs as dateTypeDefs } from '../Date';
import { typeDefs as dateTimeTypeDefs } from '../DateTime';
import { typeDefs as emailTypeDefs } from '../Email';
import { typeDefs as jsonTypeDefs } from '../JSON';
import { typeDefs as localeTypeDefs } from '../Locale';
import { typeDefs as messageTypeDefs } from '../Message';
import { typeDefs as messageContentTypeDefs } from '../MessageContent';
import { typeDefs as mutationTypeDefs } from '../Mutation';
import { typeDefs as nodeTypeDefs } from '../Node';
import { typeDefs as nonNegativeIntTypeDefs } from '../NonNegativeInt';
import { typeDefs as pageInfoTypeDefs } from '../PageInfo';
import { typeDefs as queryTypeDefs } from '../Query';
import { typeDefs as reactableTypeDefs } from '../Reactable';
import { typeDefs as reactableReactionTypeDefs } from '../ReactableReaction';
import { typeDefs as reactionTypeDefs } from '../Reaction';
import { typeDefs as subscriptionTypeDefs } from '../Subscription';
import { typeDefs as timeTypeDefs } from '../Time';
import { typeDefs as userTypeDefs } from '../User';
import { typeDefs as userSettingsTypeDefs } from '../UserSettings';
import { typeDefs as workspaceTypeDefs } from '../Workspace';
import { typeDefs as workspaceMembershipRoleTypeDefs } from '../WorkspaceMembershipRole';

const typeDefs: ReadonlyArray<DocumentNode> = [
  ...queryTypeDefs,
  ...mutationTypeDefs,
  ...subscriptionTypeDefs,
  ...pageInfoTypeDefs,
  ...nodeTypeDefs,
  ...actorTypeDefs,
  ...localeTypeDefs,
  ...emailTypeDefs,
  ...cursorTypeDefs,
  ...jsonTypeDefs,
  ...dateTimeTypeDefs,
  ...dateTypeDefs,
  ...timeTypeDefs,
  ...nonNegativeIntTypeDefs,
  ...userTypeDefs,
  ...appTypeDefs,
  ...botTypeDefs,
  ...workspaceTypeDefs,
  ...workspaceMembershipRoleTypeDefs,
  ...channelTypeDefs,
  ...channelPrivacyTypeDefs,
  ...messageTypeDefs,
  ...messageContentTypeDefs,
  ...channelTypeTypeDefs,
  ...reactionTypeDefs,
  ...reactableTypeDefs,
  ...reactableReactionTypeDefs,
  ...bookmarkTypeDefs,
  ...bookmarkableTypeDefs,
  ...userSettingsTypeDefs,
];

export default typeDefs;
