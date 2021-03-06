import { uniqBy, uniqWith } from 'lodash';
import { ServerIOActions } from 'actions/types';

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

export const typing = (
  state: TypingUser[] = [],
  action: ServerIOActions.IOResponseTypingAction
) => {
  switch (action.type) {
    case 'io/typing':
      return uniqWith(
        [...state, action.payload],
        (x, y) => x.channelId === y.channelId && x.username === y.username
      );
    case 'io/stoppedTyping':
      return state.filter(
        (e) => !(e.channelId === action.payload.channelId && e.username === action.payload.username)
      );
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
      // Sort it in creation date
      return [...action.payload].reverse();
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
      if (action.payload.type === 'private')
        return uniqBy([...state, action.payload], (e) => e.from);
      else if (action.payload.type === 'pin')
        return uniqBy([...state, action.payload], (e) => e.channelId);
    // falls through
    case 'CLEAR_PRIVATE_NOTIFICATION':
      return state.map((notification) => notification.type !== 'private');
    case 'CLEAR_PIN_NOTIFICATION':
      return state.filter((notification) => notification.channelId !== action.payload._id);
    case 'ADD_PIN_NOTIFICATION':
      return uniqBy([...state, action.payload], (e) => e.channelId);
    case 'ADD_PIN_NOTIFICATIONS':
      return uniqBy([...state, ...action.payload], (e) => e.channelId);
    default:
      return state;
  }
};

export const privateUsers = (
  state: PrivateUser[] = [],
  action: ServerIOActions.IOResponsePrivateUsersAction
) => {
  switch (action.type) {
    case 'io/privateUsers':
      return [...action.payload];
    default:
      return state;
  }
};
