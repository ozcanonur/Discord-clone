import createStyles from '@material-ui/core/styles/createStyles';

const pinnedMessagesStyles = createStyles({
  pinnedMessagesList: {
    width: '100%',
  },
  pinnedMessage: {
    paddingTop: 0,
    backgroundColor: 'rgb(64,68,75)',
    marginTop: '1rem',
    padding: '1rem 3rem',
    boxShadow: '0 1rem 1rem rgba(0, 0, 0, 0.2)',

    '& > div': {
      alignItems: 'flex-start',
    },
  },
  pinContainer: {
    position: 'absolute',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    minWidth: '35vw',
    height: '60vh',
    right: '15.5rem',
    top: '5rem',
  },
  pinHeading: {
    backgroundColor: 'rgb(32,34,37)',
    fontSize: '1.4rem',
    fontWeight: 1000,
    color: 'white',
    padding: '2rem',
  },
  pinBody: {
    backgroundColor: '#2c2f33',
    padding: '2rem',
    paddingTop: '1rem',
    fontSize: '1.5rem',
    display: 'flex',
    flexGrow: 1,
    maxHeight: '40vh',
    overflowY: 'auto',
  },
});

export default pinnedMessagesStyles;
