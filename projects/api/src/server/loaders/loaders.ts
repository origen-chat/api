import { makeBookmarkByIdLoader } from './bookmarks';
import { makeBotByIdLoader } from './bots';
import { makeChannelPinByIdLoader } from './channelPins';
import { makeChannelByIdLoader } from './channels';
import { makeMessageByIdLoader } from './messages';
import {
  makeUserByEmailLoader,
  makeUserByIdLoader,
  makeUserByUniqueUsernameLoader,
} from './users';
import {
  makeWorkspaceByIdLoader,
  makeWorkspaceByNameLoader,
} from './workspaces';

export function makeLoaders() {
  const loaders = {
    userById: makeUserByIdLoader(),
    userByEmail: makeUserByEmailLoader(),
    userByUniqueUsername: makeUserByUniqueUsernameLoader(),
    botById: makeBotByIdLoader(),
    workspaceById: makeWorkspaceByIdLoader(),
    workspaceByName: makeWorkspaceByNameLoader(),
    channelById: makeChannelByIdLoader(),
    messageById: makeMessageByIdLoader(),
    bookmarkById: makeBookmarkByIdLoader(),
    channelPinById: makeChannelPinByIdLoader(),
  };

  return loaders;
}

export type Loaders = ReturnType<typeof makeLoaders>;
