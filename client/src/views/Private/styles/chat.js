const chatStyles = {
  container: {
    display: 'flex',
    flexGrow: 2,
    flexDirection: 'column',
    overflow: 'auto',
  },
  chat: {
    flexGrow: 1,
    padding: '2rem',
    fontSize: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  warning: {
    margin: 'auto auto',
    fontSize: '2rem',
    color: 'rgb(220,221,222)',
  },
  messages: {
    marginBottom: '1rem',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  listItem: {
    paddingTop: 0,
  },
};

export default chatStyles;
