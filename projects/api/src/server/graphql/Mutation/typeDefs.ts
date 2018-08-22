import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

import { typeDefs as addBookmarkTypeDefs } from './addBookmark';
import { typeDefs as addChannelTypeDefs } from './addChannel';
import { typeDefs as addReactionTypeDefs } from './addReaction';
import { typeDefs as createWorkspaceTypeDefs } from './createWorkspace';
import { typeDefs as deleteChannelTypeDefs } from './deleteChannel';
import { typeDefs as deleteMessageTypeDefs } from './deleteMessage';
import { typeDefs as deleteWorkspaceTypeDefs } from './deleteWorkspace';
import { typeDefs as editMessageTypeDefs } from './editMessage';
import { typeDefs as joinChannelTypeDefs } from './joinChannel';
import { typeDefs as leaveChannelTypeDefs } from './leaveChannel';
import { typeDefs as pinMessageTypeDefs } from './pinMessage';
import { typeDefs as removeBookmarkTypeDefs } from './removeBookmark';
import { typeDefs as removeReactionTypeDefs } from './removeReaction';
import { typeDefs as sendMessageTypeDefs } from './sendMessage';
import { typeDefs as unpinMessageTypeDefs } from './unpinMessage';
import { typeDefs as updateChannelTypeDefs } from './updateChannel';
import { typeDefs as updateViewerTypeDefs } from './updateViewer';
import { typeDefs as updateWorkspaceTypeDefs } from './updateWorkspace';

export const Mutation = gql`
  type Mutation {
    createWorkspace(input: CreateWorkspaceInput): CreateWorkspacePayload!
    updateWorkspace(input: UpdateWorkspaceInput): UpdateWorkspacePayload!
    deleteWorkspace(input: DeleteWorkspaceInput): DeleteWorkspacePayload!

    addChannel(input: AddChannelInput): AddChannelPayload!
    updateChannel(input: UpdateChannelInput): UpdateChannelPayload!
    deleteChannel(input: DeleteChannelInput): DeleteChannelPayload!

    joinChannel(input: JoinChannelInput): JoinChannelPayload!
    leaveChannel(input: LeaveChannelInput): LeaveChannelPayload!

    sendMessage(input: SendMessageInput): SendMessagePayload!
    editMessage(input: EditMessageInput): EditMessagePayload!
    deleteMessage(input: DeleteMessageInput): DeleteMessagePayload!

    addReaction(input: AddReactionInput): AddReactionPayload!
    removeReaction(input: RemoveReactionInput): RemoveReactionPayload!

    addBookmark(input: AddBookmarkInput): AddBookmarkPayload!
    removeBookmark(input: RemoveBookmarkInput): RemoveBookmarkPayload!

    pinMessage(input: PinMessageInput): PinMessagePayload!
    unpinMessage(input: UnpinMessageInput): UnpinMessagePayload!

    updateViewer(input: UpdateViewerInput): UpdateViewerPayload!
  }
`;

const typeDefs: ReadonlyArray<DocumentNode> = [
  Mutation,
  ...createWorkspaceTypeDefs,
  ...updateWorkspaceTypeDefs,
  ...deleteWorkspaceTypeDefs,
  ...updateViewerTypeDefs,
  ...addChannelTypeDefs,
  ...updateChannelTypeDefs,
  ...deleteChannelTypeDefs,
  ...joinChannelTypeDefs,
  ...leaveChannelTypeDefs,
  ...sendMessageTypeDefs,
  ...editMessageTypeDefs,
  ...deleteMessageTypeDefs,
  ...addReactionTypeDefs,
  ...removeReactionTypeDefs,
  ...addBookmarkTypeDefs,
  ...removeBookmarkTypeDefs,
  ...pinMessageTypeDefs,
  ...unpinMessageTypeDefs,
];

export default typeDefs;
