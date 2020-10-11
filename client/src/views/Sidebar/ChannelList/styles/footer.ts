import createStyles from '@material-ui/core/styles/createStyles';

const footerStyles = createStyles({
  footer: {
    height: '6rem',
    color: 'white',
    padding: '1rem',
    display: 'flex',
    backgroundColor: 'rgb(41,43,47)',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: 'rgb(114, 137, 218)',
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
    color: 'rgb(220,221,222)',
  },
  userId: {
    fontSize: '1.1rem',
    color: 'rgb(185,187, 190)',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  },
});

export default footerStyles;
