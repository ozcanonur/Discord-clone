import qs from 'qs';

const { name } = qs.parse(window.location.search, { ignoreQueryPrefix: true });

export const connect = () => {
  return {
    type: 'io/userConnected',
    payload: name,
  };
};

export const message = (message) => {
  return {
    type: 'io/userMessaged',
    payload: { name, message },
  };
};

export const createServer = (serverName) => {
  return {
    type: 'io/userCreatedServer',
    payload: {
      name,
      server: {
        name: serverName,
        channels: [],
        users: [name],
      },
    },
  };
};

export const selectChannel = (server, channel) => {
  return {
    type: 'io/userSelectedChannel',
    payload: { name, server, channel },
  };
};
