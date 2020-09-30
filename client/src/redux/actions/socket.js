import qs from 'qs';

const { name } = qs.parse(window.location.search, { ignoreQueryPrefix: true });

export const connect = () => {
  return {
    type: 'io/userConnected',
    payload: name,
  };
};

export const createServer = (serverName) => {
  return {
    type: 'io/userCreatedServer',
    payload: {
      name,
      server: serverName,
    },
  };
};

export const selectChannel = (channel) => {
  return {
    type: 'io/userSelectedChannel',
    payload: { name, channel },
  };
};

export const message = (message) => {
  return {
    type: 'io/userMessaged',
    payload: { name, message },
  };
};
