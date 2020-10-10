import { InternalActions } from '../actions/types';

export const selectedServerName = (
  state: string = 'Default',
  action: InternalActions.SelectServerNameAction
) => {
  switch (action.type) {
    case 'SELECT_SERVER_NAME':
      return action.payload;
    default:
      return state;
  }
};

export const selectedChannel = (
  state: Channel = { _id: '', name: '', voice: false },
  action: InternalActions.SelectChannelAction
) => {
  switch (action.type) {
    case 'SELECT_CHANNEL':
      return { ...action.payload };
    default:
      return state;
  }
};

export const selectedTabInPrivate = (
  state: string = 'Chat',
  action: InternalActions.SelectTabInPrivateAction
) => {
  switch (action.type) {
    case 'SELECT_TAB_IN_PRIVATE':
      return action.payload;
    default:
      return state;
  }
};

export const selectedFriend = (state: string = '', action: InternalActions.SelectFriendAction) => {
  switch (action.type) {
    case 'SELECT_FRIEND':
      return action.payload;
    default:
      return state;
  }
};

export const activeUsersOpen = (
  state: boolean = true,
  action: InternalActions.ToggleActiveUsersAction
) => {
  switch (action.type) {
    case 'TOGGLE_ACTIVE_USERS':
      return !state;
    default:
      return state;
  }
};
