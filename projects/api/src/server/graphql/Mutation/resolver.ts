import { resolver as resolveCreateWorkspace } from './createWorkspace';
import { resolver as resolveResumeDIrectMessagesChannel } from './resumeDirectMessagesChannel';
import { resolver as resolveSendMessage } from './sendMessage';
import { resolver as resolveUpdateViewer } from './updateViewer';

const mutationResolver = {
  createWorkspace: resolveCreateWorkspace,
  sendMessage: resolveSendMessage,
  updateViewer: resolveUpdateViewer,
  resumeDirectMessagesChannel: resolveResumeDIrectMessagesChannel,
};

export default mutationResolver;
