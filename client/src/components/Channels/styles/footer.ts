import createStyles from '@material-ui/core/styles/createStyles';

const footerStyles = createStyles({
  footer: {
    height: '6rem',
    color: 'white',
    padding: '1rem',
    display: 'flex',
    backgroundColor: '#292b2f',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#7289da',
    borderRadius: '50%',
    padding: '1.5rem',
    width: '1.5rem',
    height: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: '2.5rem',
    height: '2.5rem',
    color: 'white',
  },
  onlineCircle: {
    height: '1rem',
    width: '1rem',
    borderRadius: '50%',
    position: 'absolute',
    bottom: '-3px',
    right: '0.9rem',
    backgroundColor: '#3CB371',
  },
  user: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: '1.5rem',
    overflowX: 'hidden',
    flexGrow: 1,
  },
  userName: {
    fontSize: '1.5rem',
    fontWeight: 1000,
    color: '#dcddde',
  },
  userId: {
    fontSize: '1.1rem',
    color: 'rgb(185,187, 190)',
    textTransform: 'uppercase',
    marginTop: '0.3rem',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  },
  notificationTooltip: {
    backgroundColor: 'black',
    color: '#dcddde',
    fontSize: '1.5rem',
    textAlign: 'center',
    padding: '0.5rem 1rem',
    letterSpacing: 0,
  },
});

export default footerStyles;
