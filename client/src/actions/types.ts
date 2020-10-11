export namespace InternalActions {
  export interface SelectServerNameAction {
    type: string;
    payload: string;
  }

  export interface SelectChannelAction {
    type: string;
    payload: Channel;
  }

  export interface SelectTabInPrivateAction {
    type: string;
    payload: string;
  }

  export interface ToggleActiveUsersAction {
    type: string;
  }

  export interface ClearPrivateNotificationAction {
    type: string;
  }

  export interface ClearPinNotificationAction {
    type: string;
    payload: Channel;
  }

  export interface ClearIoResponseAction {
    type: string;
  }

  export interface ClearMessages {
    type: string;
  }

  export interface SelectPrivateChannelAction {
    type: string;
    payload: string;
  }

  export interface SelectPrivateUserAction {
    type: string;
    payload: string;
  }
}

export namespace ClientIOActions {
  export interface ConnectIOAction {
    type: string;
    payload: string;
  }

  export interface CreateServerIOAction {
    type: string;
    payload: {
      name: string;
      server: string;
    };
  }

  export interface SelectChannelIOAction {
    type: string;
    payload: {
      name: string;
      channel: Channel;
    };
  }

  export interface MessageIOAction {
    type: string;
    payload: {
      name: string;
      message: string;
    };
  }

  export interface CreateChannelIOAction {
    type: string;
    payload: {
      server: Server;
      channelName: string;
      isVoice: boolean;
    };
  }

  export interface JoinServerIOAction {
    type: string;
    payload: {
      name: string;
      serverName: string;
    };
  }

  export interface SendFriendRequestIOAction {
    type: string;
    payload: {
      name: string;
      friendName: string;
    };
  }

  export interface CreatePinIOAction {
    type: string;
    payload: {
      name: string;
      message: string;
      selectedChannel: Channel;
    };
  }

  export interface DeleteMessageIOAction {
    type: string;
    payload: {
      name: string;
      message: Message;
    };
  }

  export interface DeleteServerIOAction {
    type: string;
    payload: {
      name: string;
      serverName: string;
    };
  }

  export interface DeleteChannelIOAction {
    type: string;
    payload: {
      name: string;
      channelId: string;
    };
  }

  export interface SelectPrivateChannelIOAction {
    type: string;
    payload: {
      name: string;
      username: string;
    };
  }

  export interface ConnectNewPrivateUserIOAction {
    type: string;
    payload: {
      name: string;
      username: string;
    };
  }
}

export namespace ServerIOActions {
  export interface IOResponseActiveUsersAction {
    type: string;
    payload: string[];
  }

  export interface IOResponseServersAction {
    type: string;
    payload: Server[];
  }

  export interface IOResponseIOResponseAction {
    type: string;
    payload: {
      error: string;
    };
  }

  export interface IOResponsePinnedMessagesAction {
    type: string;
    payload: Message[];
  }

  export interface IOResponseMessagesAction {
    type: string;
    payload: Message[];
  }

  export interface IOResponseNotificationsAction {
    type: string;
    payload: Notification;
  }

  export interface IOResponsePrivateUsersAction {
    type: string;
    payload: string[];
  }
}
