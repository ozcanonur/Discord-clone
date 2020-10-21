import createStyles from '@material-ui/core/styles/createStyles';

const privateUserStyles = createStyles({
  user: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '1rem',
    cursor: 'pointer',
    padding: '0.8rem 0.4rem',
    transition: 'all .2s ease-in-out',
    '&:hover': {
      backgroundColor: '#40434a !important',
    },
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
    boxShadow: '0 1rem 1rem rgba(0, 0, 0, 0.2)',
  },
  icon: {
    fontSize: '2rem',
  },
  username: {
    fontSize: '1.5rem',
    marginLeft: '1rem',
    color: '#dcddde',
    flexGrow: 1,
  },
  discordIconContainer: {
    display: 'flex',
    position: 'relative',
  },
  discordIcon: {
    height: '2.4rem',
  },
  indicators: {
    display: 'flex',
    alignItems: 'center',
  },
  messageNotification: {
    fontSize: '2rem',
    fill: 'rgba(220,221,222)',
    marginLeft: '0.5rem',
  },
  button: {
    padding: 0,
  },
});

export default privateUserStyles;
