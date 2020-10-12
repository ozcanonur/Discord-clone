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
    justifyContent: 'space-between',
    padding: '2rem',
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
  },
  userList: {
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem',
    paddingTop: 0,
    fontWeight: 1000,
    maxHeight: '32vh',
    overflow: 'auto',
  },
  directMessages: {
    fontSize: '1.3rem',
    color: '#dcddde',
    opacity: 0.7,
    textTransform: 'uppercase',
  },
});

export default privateUserListStyles;
