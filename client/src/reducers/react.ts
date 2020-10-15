import { InternalActions } from '../actions/types';

// WOOP TEMP
// const tempSelectedServer = window.location.pathname === '/private' ? 'private' : 'Default';

export const selectedServerName = (
  state: string | null = null,
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
