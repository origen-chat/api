import { DocumentNode } from 'graphql';

import { typeDefs as bookmarkTypeDefs } from '../Bookmark';
import { typeDefs as bookmarkableTypeDefs } from '../Bookmarkable';
import { typeDefs as channelTypeDefs } from '../Channel';
import { typeDefs as channelTypeTypeDefs } from '../ChannelType';
import { typeDefs as cursorTypeDefs } from '../Cursor';
import { typeDefs as emailTypeDefs } from '../Email';
import { typeDefs as messageTypeDefs } from '../Message';
import { typeDefs as mutationTypeDefs } from '../Mutation';
import { typeDefs as nodeTypeDefs } from '../Node';
import { typeDefs as pageInfoTypeDefs } from '../PageInfo';
import { typeDefs as queryTypeDefs } from '../Query';
import { typeDefs as reactableTypeDefs } from '../Reactable';
import { typeDefs as reactionTypeDefs } from '../Reaction';
import { typeDefs as subscriptionTypeDefs } from '../Subscription';
import { typeDefs as userTypeDefs } from '../User';
import { typeDefs as workspaceTypeDefs } from '../Workspace';

const typeDefs: ReadonlyArray<DocumentNode> = [
  ...queryTypeDefs,
  ...mutationTypeDefs,
  ...subscriptionTypeDefs,
  ...pageInfoTypeDefs,
  ...nodeTypeDefs,
  ...emailTypeDefs,
  ...cursorTypeDefs,
  ...userTypeDefs,
  ...workspaceTypeDefs,
  ...channelTypeDefs,
  ...messageTypeDefs,
  ...channelTypeTypeDefs,
  ...reactionTypeDefs,
  ...reactableTypeDefs,
  ...bookmarkTypeDefs,
  ...bookmarkableTypeDefs,
];

export default typeDefs;
