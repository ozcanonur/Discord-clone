import createStyles from '@material-ui/core/styles/createStyles';

const pinnedMessagesStyles = createStyles({
  pinnedMessagesList: {
    width: '100%',
  },
  pinnedMessage: {
    paddingTop: 0,
    backgroundColor: '#40444b',
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
    minWidth: '30vw',
    height: '50vh',
    right: '15.5rem',
    top: '5rem',
  },
  pinHeading: {
    backgroundColor: '#202225',
    fontSize: '1.7rem',
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
