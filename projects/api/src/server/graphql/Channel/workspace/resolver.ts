import { channels } from '../../../../core';
import { Resolver } from '../../../types';

const resolveWorkspace: Resolver<channels.Channel> = async channel => {
  const workspace = await channels.getWorkspace(channel);

  return workspace;
};

export default resolveWorkspace;
