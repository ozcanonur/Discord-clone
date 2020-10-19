import createStyles from '@material-ui/core/styles/createStyles';

const headerStyles = createStyles({
  headerContainer: {
    height: '6rem',
    backgroundColor: '#36393f',
    color: 'white',
    fontSize: '2rem',
    padding: '1rem  2rem',
    borderBottom: '2px solid #202225',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
  },
  titleIcon: {
    fontSize: '2rem',
    color: '#dcddde',
  },
  titleText: {
    marginLeft: '1rem',
    fontSize: '1.5rem',
    fontWeight: 1000,
    color: '#dcddde',
  },
  optionsContainer: {
    display: 'flex',
    position: 'relative',
  },
  notificationAlert: {
    position: 'absolute',
    backgroundColor: 'red',
    bottom: '20%',
    right: '20%',
    borderRadius: '50%',
    height: '1rem',
    width: '1rem',
  },
  notificationTooltip: {
    backgroundColor: '#202225',
    color: '#dcddde',
    fontSize: '1.5rem',
    fontWeight: 700,
    textAlign: 'center',
    letterSpacing: 0,
  },
  search: {
    padding: '1rem',
    height: '6rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    cursor: 'pointer',
  },
  searchText: {
    fontSize: '1.4rem',
    fontWeight: 700,
    color: '#dcddde',
    padding: '1rem 4rem',
    backgroundColor: '#202225',
    borderRadius: '1rem',
    width: '100%',
    transition: 'all .2s ease-in-out',
    opacity: 0.7,

    '&:hover': {
      backgroundColor: '#dcddde',
      color: 'black',
      opacity: '1 !important',
    },
  },
  pinLogo: {
    fill: '#dcddde',
    height: '2rem',
  },
  notifications: {
    position: 'relative',
  },
});

export default headerStyles;
