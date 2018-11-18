import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

export const Date = gql`
  """
  The \`Date\` scalar type represents a
  date string, such as 2007-12-03, compliant with the \`full-date\`
  format outlined in section 5.6 of the RFC 3339 profile of the
  ISO 8601 standard for representation of dates and times using
  the Gregorian calendar.
  """
  scalar Date
`;

const typeDefs: ReadonlyArray<DocumentNode> = [Date];

export default typeDefs;
