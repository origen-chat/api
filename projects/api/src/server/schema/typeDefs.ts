import { typeDefs as channelTypeDefs } from '../Channel';
import { typeDefs as emailTypeDefs } from '../Email';
import { typeDefs as messageTypeDefs } from '../Message';
import { typeDefs as mutationTypeDefs } from '../Mutation';
import { typeDefs as nodeTypeDefs } from '../Node';
import { typeDefs as pageInfoTypeDefs } from '../PageInfo';
import { typeDefs as queryTypeDefs } from '../Query';
import { typeDefs as reactionTypeDefs } from '../Reaction';
import { typeDefs as userTypeDefs } from '../User';
import { typeDefs as workspaceTypeDefs } from '../Workspace';

const typeDefs = [
  ...queryTypeDefs,
  ...mutationTypeDefs,
  ...pageInfoTypeDefs,
  ...nodeTypeDefs,
  ...emailTypeDefs,
  ...userTypeDefs,
  ...workspaceTypeDefs,
  ...channelTypeDefs,
  ...messageTypeDefs,
  ...reactionTypeDefs,
];

export default typeDefs;
