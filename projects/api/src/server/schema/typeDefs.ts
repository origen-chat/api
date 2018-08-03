import { typeDef as mutationTypeDef } from '../mutation';
import { typeDef as queryTypeDef } from '../query';
import { typeDef as uniqueUsernameTypeDef } from '../uniqueUsername';
import { typeDef as userTypeDef } from '../user';

const typeDefs = [
  queryTypeDef,
  mutationTypeDef,
  userTypeDef,
  uniqueUsernameTypeDef,
];

export default typeDefs;
