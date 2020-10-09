import createStyles from '@material-ui/core/styles/createStyles';

const headerStyles = createStyles({
  headerContainer: {
    height: '6rem',
    backgroundColor: '#36393f',
    color: 'white',
    fontSize: '2rem',
    padding: '1rem  2rem',
    borderBottom: '2px solid rgb(32,34,37)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  friendsIcon: {
    fontSize: '3rem',
    color: 'rgb(220,221,222)',
    opacity: 0.7,
  },
  friendsText: {
    fontSize: '1.5rem',
    fontWeight: 1000,
    color: 'rgb(220,221,222)',
    marginLeft: '2rem',
  },
  friendButtonContainer: {
    marginLeft: '3rem',
  },
  friendButton: {
    backgroundColor: 'transparent',
    color: 'rgb(220,221,222)',
    fontSize: '1.5rem',
    fontWeight: 1000,
    fontFamily: 'Lato, sans-serif',
    textTransform: 'capitalize',
    marginLeft: '2rem',
    boxShadow: 'none',
    transition: 'all .2s ease-in-out',
    '&:hover': {
      color: '#36393f',
    },
  },
  friendButtonAdd: {
    fontSize: '1.5rem',
    fontWeight: 1000,
    fontFamily: 'Lato, sans-serif',
    textTransform: 'capitalize',
    marginLeft: '2rem',
    color: 'white',
    boxShadow: 'none',
    transition: 'all .2s ease-in-out',

    '&:hover': {
      backgroundColor: '#2c8a5f',
    },
  },
  optionsContainer: {
    display: 'flex',
  },
  notificationTooltip: {
    backgroundColor: 'rgb(32,34,37)',
    color: 'rgb(220,221,222)',
    fontSize: '1.5rem',
    fontWeight: 700,
    textAlign: 'center',
    letterSpacing: 0,
  },
});

export default headerStyles;