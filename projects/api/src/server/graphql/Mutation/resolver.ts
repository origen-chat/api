import { resolver as resolveResumeDIrectMessagesChannel } from './resumeDirectMessagesChannel';
import { resolver as resolveUpdateViewer } from './updateViewer';

const mutationResolver = {
  updateViewer: resolveUpdateViewer,
  resumeDirectMessagesChannel: resolveResumeDIrectMessagesChannel,
};

export default mutationResolver;
