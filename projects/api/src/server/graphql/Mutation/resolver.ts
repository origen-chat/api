import { resolver as resolveCreateNamedChannel } from './createNamedChannel';
import { resolver as resolveCreateWorkspace } from './createWorkspace';
import { resolver as resolveEditMessage } from './editMessage';
import { resolver as resolveResumeDIrectMessagesChannel } from './resumeDirectMessagesChannel';
import { resolver as resolveSendMessage } from './sendMessage';
import { resolver as resolveUpdateViewer } from './updateViewer';

const mutationResolver = {
  createWorkspace: resolveCreateWorkspace,
  sendMessage: resolveSendMessage,
  editMessage: resolveEditMessage,
  updateViewer: resolveUpdateViewer,
  resumeDirectMessagesChannel: resolveResumeDIrectMessagesChannel,
  createNamedChannel: resolveCreateNamedChannel,
};

export default mutationResolver;
