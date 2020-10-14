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
  name,
  selectedServerName,
  selectedChannel,
  selectedTabInPrivate,
  selectedPrivateUser,
  activeUsersOpen,
} from './react';

export const reducers = combineReducers<RootState>({
  name,
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
});
