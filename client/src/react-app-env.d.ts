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

interface PrivateUser {
  name: string;
  isFriend: boolean;
}

interface User {
  name: string | null;
  id: string | null;
}

interface RootState {
  user: User;
  selectedServerName: string;
  selectedChannel: Channel;
  selectedTabInPrivate: string;
  activeUsersOpen: boolean;
  activeUsers: string[];
  selectedPrivateUser: string;
  privateUsers: PrivateUser[];
  messages: Message[];
  servers: Server[];
  pinnedMessages: Message[];
  ioResponse: {
    error?: string;
  };
  notifications: Notification[];
}
