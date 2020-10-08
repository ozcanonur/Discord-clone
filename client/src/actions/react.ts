import { InternalActions } from './types';

export const selectServerName = (serverName: string): InternalActions.SelectServerNameAction => {
  return {
    type: 'SELECT_SERVER_NAME',
    payload: serverName,
  };
};

export const selectChannel = (channel: Channel): InternalActions.SelectChannelAction => {
  return {
    type: 'SELECT_CHANNEL',
    payload: channel,
  };
};

export const selectTabInPrivate = (tabName: string): InternalActions.SelectTabInPrivateAction => {
  return {
    type: 'SELECT_TAB_IN_PRIVATE',
    payload: tabName,
  };
};

export const selectFriendChannel = (
  friendName: string
): InternalActions.SelectFriendChannelAction => {
  return {
    type: 'SELECT_FRIEND_CHANNEL',
    payload: friendName,
  };
};

export const selectFriend = (friendName: string): InternalActions.SelectFriendAction => {
  return {
    type: 'SELECT_FRIEND',
    payload: friendName,
  };
};

export const toggleActiveUsers = (): InternalActions.ToggleActiveUsersAction => {
  return {
    type: 'TOGGLE_ACTIVE_USERS',
  };
};

export const clearPrivateNotification = (
  friendName: string
): InternalActions.ClearPrivateNotificationAction => {
  return {
    type: 'CLEAR_PRIVATE_NOTIFICATION',
    payload: friendName,
  };
};

export const clearPinNotification = (
  channel: Channel
): InternalActions.ClearPinNotificationAction => {
  return {
    type: 'CLEAR_PIN_NOTIFICATION',
    payload: channel,
  };
};

export const clearIoResponse = (): InternalActions.ClearIoResponseAction => {
  return {
    type: 'CLEAR_IO_RESPONSE',
  };
};
