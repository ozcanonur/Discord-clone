/// <reference types="react-scripts" />

declare module '*.mp3' {
  const src: string;
  export default src;
}

interface Message {
  _id: string;
  username: string;
  message: string;
  createdAt: string;
}

interface VoiceUser {
  name: string;
  _id: string;
}

interface Channel {
  _id: string | undefined;
  name: string;
  isVoice: boolean;
  voiceUsers: VoiceUser[];
}

interface Server {
  _id: string;
  name: string;
  channels: Channel[];
  admin: string;
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

interface TypingUser {
  username: string;
  channelId: string;
}

interface RootState {
  user: User;
  selectedServerName: string | null;
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
  peer: Peer;
  typing: TypingUser[];
}
