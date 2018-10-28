import { resolver as resolveCreateWorkspace } from './createWorkspace';
import { resolver as resolveResumeDIrectMessagesChannel } from './resumeDirectMessagesChannel';
import { resolver as resolveUpdateViewer } from './updateViewer';

const mutationResolver = {
  createWorkspace: resolveCreateWorkspace,
  updateViewer: resolveUpdateViewer,
  resumeDirectMessagesChannel: resolveResumeDIrectMessagesChannel,
};

export default mutationResolver;
