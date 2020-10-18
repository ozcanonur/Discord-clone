import createStyles from '@material-ui/core/styles/createStyles';

const chatStyles = createStyles({
  container: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
  },
  chat: {
    flexGrow: 1,
    padding: '2rem',
    fontSize: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    maxHeight: '100%',
  },
  warning: {
    margin: 'auto auto',
    fontSize: '2rem',
    color: '#dcddde',
  },
  messages: {
    marginBottom: '1rem',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column-reverse',
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  listItem: {
    padding: '0 1rem',
    '&:hover': {
      backgroundColor: '#2f3136',
      '& div': {
        visibility: 'visible',
      },
    },
  },
  messageOptions: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: '1rem',
    visibility: 'hidden',
  },
  optionIcon: {
    fontSize: '2.3rem',
    cursor: 'pointer',
    transition: 'transform .2s',

    '&:hover': {
      transform: 'scale(1.2)',
    },
  },
  notificationTooltip: {
    backgroundColor: '#202225',
    color: '#dcddde',
    fontSize: '1.2rem',
    fontWeight: 700,
    textAlign: 'center',
    letterSpacing: 0,
    padding: '1rem',
  },
  infiniteScroll: {
    display: 'flex',
    flexDirection: 'column-reverse',
    marginBottom: '1rem',
  },
  loading: {
    alignSelf: 'center',
    position: 'absolute',
    top: 0,
  },
  endMessage: {
    textAlign: 'center',
    color: '#dcddde',
    fontSize: '2rem',
    paddingBottom: '1rem',
    borderBottom: '2px solid rgba(220,221,222,0.5)',
    marginBottom: '1rem',
    fontWeight: 700,
  },
});

export default chatStyles;
