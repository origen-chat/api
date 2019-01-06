import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

export const Time = gql`
  """
  The \`Time\` scalar type represents a
  time string at UTC, such as 10:15:30Z, compliant with
  the \`full-time\` format outlined in section 5.6 of the RFC 3339
  profile of the ISO 8601 standard for representation of dates and
  times using the Gregorian calendar.
  """
  scalar Time
`;

const typeDefs: ReadonlyArray<DocumentNode> = [Time];

export default typeDefs;
