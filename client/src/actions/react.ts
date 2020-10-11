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

export const clearPrivateNotification = (): InternalActions.ClearPrivateNotificationAction => {
  return {
    type: 'CLEAR_PRIVATE_NOTIFICATION',
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

export const clearMessages = (): InternalActions.ClearMessages => {
  return {
    type: 'CLEAR_MESSAGES',
  };
};

export const toggleActiveUsers = (): InternalActions.ToggleActiveUsersAction => {
  return {
    type: 'TOGGLE_ACTIVE_USERS',
  };
};

export const selectPrivateChannel = (
  username: string
): InternalActions.SelectPrivateChannelAction => {
  return {
    type: 'SELECT_PRIVATE_CHANNEL',
    payload: username,
  };
};

export const selectPrivateUser = (username: string): InternalActions.SelectPrivateUserAction => {
  return {
    type: 'SELECT_PRIVATE_USER',
    payload: username,
  };
};
