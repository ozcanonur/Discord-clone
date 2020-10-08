import { combineReducers } from 'redux';

import {
  messages,
  activeUsers,
  servers,
  friends,
  notifications,
  ioResponse,
  pinnedMessages,
} from './socket';
import {
  selectedServerName,
  selectedChannel,
  selectedTabInPrivate,
  selectedFriend,
  activeUsersOpen,
} from './react';

export const reducers = combineReducers<RootState>({
  selectedServerName,
  selectedChannel,
  selectedTabInPrivate,
  activeUsersOpen,
  activeUsers,
  selectedFriend,
  friends,
  messages,
  servers,
  pinnedMessages,
  ioResponse,
  notifications,
});
