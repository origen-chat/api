import { resolver as emailResolver } from '../email';
import { resolver as mutationResolver } from '../mutation';
import { resolver as queryResolver } from '../query';
import { resolver as userResolver } from '../user';

const resolvers = {
  Query: queryResolver,
  Mutation: mutationResolver,
  User: userResolver,
  Email: emailResolver,
};

export default resolvers;
