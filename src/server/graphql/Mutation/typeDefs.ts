import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

import { typeDefs as addBookmarkTypeDefs } from './addBookmark';
import { typeDefs as addReactionTypeDefs } from './addReaction';
import { typeDefs as broadcastTypingTypeDefs } from './broadcastTyping';
import { typeDefs as createNamedChannelTypeDefs } from './createNamedChannel';
import { typeDefs as createWorkspaceTypeDefs } from './createWorkspace';
import { typeDefs as deleteChannelTypeDefs } from './deleteChannel';
import { typeDefs as deleteMessageTypeDefs } from './deleteMessage';
import { typeDefs as deleteWorkspaceTypeDefs } from './deleteWorkspace';
import { typeDefs as editMessageTypeDefs } from './editMessage';
import { typeDefs as joinNamedChannelTypeDefs } from './joinNamedChannel';
import { typeDefs as leaveChannelTypeDefs } from './leaveChannel';
import { typeDefs as pinMessageTypeDefs } from './pinMessage';
import { typeDefs as removeBookmarkTypeDefs } from './removeBookmark';
import { typeDefs as removeReactionTypeDefs } from './removeReaction';
import { typeDefs as resumeDirectMessagesChannelTypeDefs } from './resumeDirectMessagesChannel';
import { typeDefs as sendMessageTypeDefs } from './sendMessage';
import { typeDefs as toggleReactableReactionTypeDefs } from './toggleReactableReaction';
import { typeDefs as unpinMessageTypeDefs } from './unpinMessage';
import { typeDefs as updateChannelTypeDefs } from './updateChannel';
import { typeDefs as updateViewerTypeDefs } from './updateViewer';
import { typeDefs as updateWorkspaceTypeDefs } from './updateWorkspace';

export const Mutation = gql`
  type Mutation {
    createWorkspace(input: CreateWorkspaceInput): CreateWorkspacePayload!
    updateWorkspace(input: UpdateWorkspaceInput): UpdateWorkspacePayload!
    deleteWorkspace(input: DeleteWorkspaceInput): DeleteWorkspacePayload!

    createNamedChannel(
      input: CreateNamedChannelInput
    ): CreateNamedChannelPayload!
    resumeDirectMessagesChannel(
      input: ResumeDirectMessagesChannelInput
    ): ResumeDirectMessagesChannelPayload!
    updateChannel(input: UpdateChannelInput): UpdateChannelPayload!
    deleteChannel(input: DeleteChannelInput): DeleteChannelPayload!

    joinNamedChannel(input: JoinNamedChannelInput): JoinNamedChannelPayload!
    leaveChannel(input: LeaveChannelInput): LeaveChannelPayload!

    broadcastTyping(input: BroadcastTypingInput): BroadcastTypingPayload!

    sendMessage(input: SendMessageInput): SendMessagePayload!
    editMessage(input: EditMessageInput): EditMessagePayload!
    deleteMessage(input: DeleteMessageInput): DeleteMessagePayload!

    addReaction(input: AddReactionInput): AddReactionPayload!
    removeReaction(input: RemoveReactionInput): RemoveReactionPayload!

    toggleReactableReaction(
      input: ToggleReactableReactionInput
    ): ToggleReactableReactionPayload!

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
  ...createNamedChannelTypeDefs,
  ...resumeDirectMessagesChannelTypeDefs,
  ...updateChannelTypeDefs,
  ...deleteChannelTypeDefs,
  ...joinNamedChannelTypeDefs,
  ...leaveChannelTypeDefs,
  ...sendMessageTypeDefs,
  ...editMessageTypeDefs,
  ...deleteMessageTypeDefs,
  ...addReactionTypeDefs,
  ...removeReactionTypeDefs,
  ...toggleReactableReactionTypeDefs,
  ...addBookmarkTypeDefs,
  ...removeBookmarkTypeDefs,
  ...pinMessageTypeDefs,
  ...unpinMessageTypeDefs,
  ...broadcastTypingTypeDefs,
];

export default typeDefs;
