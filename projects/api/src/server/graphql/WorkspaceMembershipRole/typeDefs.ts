import { gql } from 'apollo-server-express';

const WorkspaceMembershipRole = gql`
  enum WorkspaceMembershipRole {
    OWNER
    ADMIN
    MEMBER
    GUEST
    BOT
  }
`;

export default [WorkspaceMembershipRole];
