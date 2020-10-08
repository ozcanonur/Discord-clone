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
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
  },
  titleIcon: {
    fontSize: '2rem',
    color: 'rgb(220,221,222)',
  },
  titleText: {
    marginLeft: '1rem',
    fontSize: '1.5rem',
    fontWeight: 1000,
    color: 'rgb(220,221,222)',
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
    backgroundColor: 'rgb(32,34,37)',
    color: 'rgb(220,221,222)',
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
    color: 'rgb(220,221,222)',
    padding: '1rem 4rem',
    backgroundColor: 'rgb(32,34,37)',
    borderRadius: '1rem',
    width: '100%',
    transition: 'all .2s ease-in-out',
    opacity: 0.7,

    '&:hover': {
      backgroundColor: 'rgb(220,221,222)',
      color: 'black',
      opacity: '1 !important',
    },
  },
});

export default headerStyles;
