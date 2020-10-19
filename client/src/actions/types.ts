import Peer from 'peerjs';

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

  export interface AddNotification {
    type: string;
    payload: {
      type: string;
      from?: string;
      channelId?: string;
    };
  }

  interface PinNotification {
    type: string;
    channelId: string;
  }

  export interface AddPinNotifications {
    type: string;
    payload: PinNotification[] | undefined;
  }

  export interface Login {
    type: string;
    payload: {
      name: string | null;
      id: string | null;
    };
  }

  export interface setPeer {
    type: string;
    payload: Peer;
  }
}

export namespace ClientIOActions {
  export interface ConnectIOAction {
    type: string;
    payload: {
      name: string | null;
    };
  }

  export interface DisconnectIOAction {
    type: string;
  }

  export interface CreateServerIOAction {
    type: string;
    payload: {
      server: string;
    };
  }

  export interface SelectChannelIOAction {
    type: string;
    payload: {
      channel: Channel;
    };
  }

  export interface SelectVoiceChannelIOAction {
    type: string;
    payload: {
      channel: Channel;
    };
  }

  export interface MessageIOAction {
    type: string;
    payload: {
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
      serverName: string;
    };
  }

  export interface SendFriendRequestIOAction {
    type: string;
    payload: {
      friendName: string;
    };
  }

  export interface RemoveFriendIOAction {
    type: string;
    payload: {
      friendName: string;
    };
  }

  export interface CreatePinIOAction {
    type: string;
    payload: {
      message: Message;
      selectedChannel: Channel;
    };
  }

  export interface DeleteMessageIOAction {
    type: string;
    payload: {
      message: Message;
    };
  }

  export interface DeleteServerIOAction {
    type: string;
    payload: {
      name: string | null;
      serverName: string;
    };
  }

  export interface DeleteChannelIOAction {
    type: string;
    payload: {
      name: string | null;
      channelId: string;
    };
  }

  export interface SelectPrivateChannelIOAction {
    type: string;
    payload: {
      username: string;
    };
  }

  export interface ConnectNewPrivateUserIOAction {
    type: string;
    payload: {
      username: string;
    };
  }

  export interface LeaveServerIOAction {
    type: string;
    payload: {
      serverName: string;
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
    payload: PrivateUser[];
  }
}
