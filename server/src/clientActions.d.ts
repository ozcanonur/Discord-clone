// Objects that are coming from client Redux actions
interface ClientServer {
  _id: string;
  name: string;
  channels: Channel[];
  admin: string;
}

interface ClientChannel {
  _id: string;
  name: string;
  isVoice: boolean;
  voiceUsers: VoiceUser[];
}

interface ClientMessage {
  _id: string;
  username: string;
  message: string;
  createdAt: string;
}

// ioConnection
interface ConnectIOAction {
  type: string;
  payload: {
    name: string | null;
  };
}

// ioChannel
interface CreateChannelIOAction {
  type: string;
  payload: {
    server: ClientServer;
    channelName: string;
    isVoice: boolean;
  };
}

interface SelectChannelIOAction {
  type: string;
  payload: {
    channel: ClientChannel;
  };
}

interface DeleteChannelIOAction {
  type: string;
  payload: {
    channelId: string;
  };
}

interface CreatePinIOAction {
  type: string;
  payload: {
    message: ClientMessage;
    selectedChannel: ClientChannel;
  };
}

// ioMessage
interface MessageIOAction {
  type: string;
  payload: {
    message: string;
  };
}

interface DeleteMessageIOAction {
  type: string;
  payload: {
    message: ClientMessage;
  };
}

// ioPrivate
interface AddFriendIOAction {
  type: string;
  payload: {
    friendName: string;
  };
}

interface ConnectNewPrivateUserIOAction {
  type: string;
  payload: {
    username: string;
  };
}

interface RemoveFriendIOAction {
  type: string;
  payload: {
    friendName: string;
  };
}

interface SelectPrivateChannelIOAction {
  type: string;
  payload: {
    username: string;
  };
}

// ioServer
interface CreateServerIOAction {
  type: string;
  payload: {
    server: string;
  };
}

interface JoinServerIOAction {
  type: string;
  payload: {
    serverName: string;
  };
}

interface DeleteServerIOAction {
  type: string;
  payload: {
    name: string | null;
    serverName: string;
  };
}

interface LeaveServerIOAction {
  type: string;
  payload: {
    serverName: string;
  };
}
