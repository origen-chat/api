import { typeDef as mutationTypeDef } from '../mutation';
import { typeDef as queryTypeDef } from '../query';
import { typeDef as userTypeDef } from '../user';

const typeDefs = [queryTypeDef, mutationTypeDef, userTypeDef];

export default typeDefs;
