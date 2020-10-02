const headerStyles = {
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
    backgroundColor: 'black',
    color: 'rgb(220,221,222)',
    fontSize: '1.5rem',
    fontWeight: 700,
    textAlign: 'center',
    letterSpacing: 0,
  },
};

export default headerStyles;
