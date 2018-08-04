import { typeDef as emailTypeDef } from '../email';
import { typeDef as mutationTypeDef } from '../mutation';
import { typeDef as queryTypeDef } from '../query';
import { typeDef as uniqueUsernameTypeDef } from '../uniqueUsername';
import { typeDef as uniqueUsernameInputTypeDef } from '../uniqueUsernameInput';
import { typeDef as userTypeDef } from '../user';

const typeDefs = [
  queryTypeDef,
  mutationTypeDef,
  emailTypeDef,
  userTypeDef,
  uniqueUsernameTypeDef,
  uniqueUsernameInputTypeDef,
];

export default typeDefs;
