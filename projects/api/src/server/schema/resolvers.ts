import { resolver as mutationResolver } from '../mutation';
import { resolver as queryResolver } from '../query';
import { resolver as userResolver } from '../user';

const resolvers = { ...queryResolver, ...mutationResolver, ...userResolver };

export default resolvers;
