import createStyles from '@material-ui/core/styles/createStyles';

const privateUserListStyles = createStyles({
  container: {
    height: '100vh',
    backgroundColor: '#2f3136',
    color: 'white',
    fontSize: '2rem',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  subContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem',
    paddingTop: '1.5rem',
    maxHeight: '50%',
    overflow: 'auto',
  },
  otherSubContainer: {
    borderTop: '4px solid #202225',
  },
  heading: {
    backgroundColor: '#292b2f',
    padding: '1rem',
    height: '6rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    cursor: 'pointer',
  },
  headingText: {
    fontSize: '1.4rem',
    color: '#dcddde',
    opacity: 0.7,
    padding: '1rem 2rem',
    backgroundColor: '#202225',
    borderRadius: '1rem',
    width: '100%',
    transition: 'all .2s ease-in-out',
    '&:hover': {
      backgroundColor: '#dcddde',
      color: 'black',
      opacity: '1 !important',
      fontWeight: 1000,
    },
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  usersIcon: {
    fontSize: '3rem',
    color: '#dcddde',
    opacity: 0.7,
  },
  usersText: {
    fontSize: '1.5rem',
    fontWeight: 1000,
    color: '#dcddde',
    marginLeft: '2rem',
  },
  userList: {
    display: 'flex',
    flexDirection: 'column',
    fontWeight: 1000,
    flexGrow: 1,
    marginTop: '1rem',
  },
  directMessages: {
    fontSize: '1.3rem',
    color: '#dcddde',
    opacity: 0.7,
    textTransform: 'uppercase',
    marginTop: '2rem',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
});

export default privateUserListStyles;
