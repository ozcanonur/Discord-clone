import { combineReducers } from 'redux';

import {
  messages,
  activeUsers,
  servers,
  privateUsers,
  notifications,
  ioResponse,
  pinnedMessages,
} from './socket';
import {
  user,
  selectedServerName,
  selectedChannel,
  selectedTabInPrivate,
  selectedPrivateUser,
  activeUsersOpen,
  peer,
} from './react';

export const reducers = combineReducers<RootState>({
  user,
  selectedServerName,
  selectedChannel,
  selectedTabInPrivate,
  activeUsersOpen,
  activeUsers,
  selectedPrivateUser,
  privateUsers,
  messages,
  servers,
  pinnedMessages,
  ioResponse,
  notifications,
  peer,
});
