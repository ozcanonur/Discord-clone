import createStyles from '@material-ui/core/styles/createStyles';

const chatStyles = createStyles({
  container: {
    display: 'flex',
    flexGrow: 1,
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
    padding: '0 1rem',
    '&:hover': {
      backgroundColor: 'rgb(47,49,54)',
      '& div': {
        display: 'inherit',
      },
    },
  },
  messageOptions: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: '1rem',
    display: 'none',
  },
  optionIcon: {
    fontSize: '2.3rem',
    cursor: 'pointer',
    transition: 'all .2s',

    '&:hover': {
      transform: 'scale(1.2)',
    },
  },
  notificationTooltip: {
    backgroundColor: 'rgb(32,34,37)',
    color: 'rgb(220,221,222)',
    fontSize: '1.2rem',
    fontWeight: 700,
    textAlign: 'center',
    letterSpacing: 0,
    padding: '1rem',
  },
});

export default chatStyles;
