import { InternalActions } from '../actions/types';

export const selectedServer = (
  state: Server = { _id: '', name: '', channels: [] },
  action: InternalActions.SelectServerAction
) => {
  switch (action.type) {
    case 'SELECT_SERVER':
      return action.payload;
    case 'io/selectedServer':
      return action.payload;
    default:
      return state;
  }
};

export const selectedChannel = (
  state: Channel = { _id: '', name: '', voice: false, voiceUsers: [] },
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

export const selectedPrivateUser = (
  state: string = '',
  action: InternalActions.SelectPrivateUserAction
) => {
  switch (action.type) {
    case 'SELECT_PRIVATE_USER':
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

export const user = (state: User = { name: null, id: null }, action: InternalActions.Login) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload;
    default:
      return state;
  }
};
