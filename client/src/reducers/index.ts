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
  selectedServer,
  selectedChannel,
  selectedTabInPrivate,
  selectedPrivateUser,
  activeUsersOpen,
} from './react';

export const reducers = combineReducers<RootState>({
  user,
  selectedServer,
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
});
