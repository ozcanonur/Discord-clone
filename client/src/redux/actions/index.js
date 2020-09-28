export const join = (username) => {
  return {
    type: 'io/join',
    payload: username,
  };
};

export const sendMessage = (message) => {
  return {
    type: 'io/message',
    payload: message,
  };
};
