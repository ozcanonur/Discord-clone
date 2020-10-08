/// <reference types="react-scripts" />

interface Message {
  _id: string;
  username: string;
  message: string;
  createdAt: string;
}

interface Channel {
  _id: string;
  name: string;
  voice: boolean;
}

interface Server {
  _id: string;
  name: string;
  channels: Channel[];
}

interface Notification {
  type: string;
  channelId?: string;
  from?: string;
}

interface RootState {
  selectedServerName: string;
  selectedChannel: Channel;
  selectedTabInPrivate: string;
  activeUsersOpen: boolean;
  activeUsers: string[];
  selectedFriend: string;
  friends: string[];
  messages: Message[];
  servers: Server[];
  pinnedMessages: Message[];
  ioResponse: {
    error?: string;
  };
  notifications: Notification[];
}
