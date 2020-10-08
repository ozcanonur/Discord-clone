import { uniqBy } from 'lodash';
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
  action: ServerIOActions.IOResponseMessagesAction
) => {
  switch (action.type) {
    case 'io/messages':
      return [...action.payload];
    default:
      return state;
  }
};

const clearPrivateNotifications = (
  state: Notification[],
  action: ServerIOActions.IOResponseNotificationsAction
) => {
  return action.payload
    ? state.filter(
        (notification: Notification) =>
          notification.from && notification.from !== action.payload.from
      )
    : state.filter((notification: Notification) => notification.type !== 'private');
};

const clearPinNotification = (
  state: Notification[],
  action: ServerIOActions.IOResponseNotificationsAction
) => {
  return state.filter(
    (notification: Notification) =>
      notification.channelId && notification.channelId !== action.payload.channelId
  );
};

export const notifications = (
  state: Notification[] = [],
  action: ServerIOActions.IOResponseNotificationsAction
) => {
  switch (action.type) {
    case 'io/notification':
      return uniqBy([...state, action.payload], (e) => e.from);
    case 'CLEAR_PRIVATE_NOTIFICATION':
      return clearPrivateNotifications(state, action);
    case 'CLEAR_PIN_NOTIFICATION':
      return clearPinNotification(state, action);
    default:
      return state;
  }
};
