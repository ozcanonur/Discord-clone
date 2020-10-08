import uniqBy from 'lodash/uniqBy';
import { ServerIOActions } from '../actions/types';

export const activeUsers = (
  state: string[] = [],
  action: ServerIOActions.IOResponseActiveUsersAction
) => {
  switch (action.type) {
    case 'io/activeUsers':
      return [...action.payload];
    default:
      return state;
  }
};

export const servers = (state: Server[] = [], action: ServerIOActions.IOResponseServersAction) => {
  switch (action.type) {
    case 'io/servers':
      return [...action.payload];
    default:
      return state;
  }
};

export const friends = (state: string[] = [], action: ServerIOActions.IOResponseFriendsAction) => {
  switch (action.type) {
    case 'io/friends':
      return [...action.payload];
    default:
      return state;
  }
};

export const ioResponse = (
  state: { error?: string } = {},
  action: ServerIOActions.IOResponseIOResponseAction
) => {
  switch (action.type) {
    case 'io/response':
      return { ...action.payload };
    case 'CLEAR_IO_RESPONSE':
      return {};
    default:
      return state;
  }
};

export const pinnedMessages = (
  state: Message[] = [],
  action: ServerIOActions.IOResponsePinnedMessagesAction
) => {
  switch (action.type) {
    case 'io/pinnedMessages':
      return [...action.payload];
    default:
      return state;
  }
};

export const messages = (
  state: Message[] = [],
  action: ServerIOActions.IOResponseMessagesAction | any
) => {
  switch (action.type) {
    case 'io/messages':
      return [...action.payload];
    case 'CLEAR_MESSAGES':
      return [];
    default:
      return state;
  }
};

export const notifications = (
  state: Notification[] = [],
  action: ServerIOActions.IOResponseNotificationsAction | any
) => {
  switch (action.type) {
    case 'io/notification':
      return uniqBy([...state, action.payload], (e) => e.from);
    case 'CLEAR_PRIVATE_NOTIFICATION':
      return state.map((notification) => notification.type !== 'private');
    case 'CLEAR_PIN_NOTIFICATION':
      return state.filter((notification) => notification.channelId !== action.payload._id);
    default:
      return state;
  }
};
