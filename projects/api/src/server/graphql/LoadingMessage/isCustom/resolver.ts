import * as core from '../../../../core';
import { Resolver } from '../../../types';

const resolveIsCustom: Resolver<
  core.loadingMessages.LoadingMessage
> = async loadingMessage => {
  const isCustom = core.loadingMessages.isCustomLoadingMessage(loadingMessage);

  return isCustom;
};

export default resolveIsCustom;
