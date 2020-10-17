import createStyles from '@material-ui/core/styles/createStyles';

const activeUserStyles = createStyles({
  user: {
    width: '100%',
    maxWidth: '20rem',
    display: 'flex',
    alignItems: 'center',
    marginTop: '1rem',
    cursor: 'pointer',
    padding: '0.8rem',
    transition: 'all .2s ease-in-out',
    '&:hover': {
      backgroundColor: '#40434a !important',
    },
    overflowX: 'hidden',
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
  username: {
    fontSize: '1.5rem',
    marginLeft: '1rem',
    color: '#dcddde',
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
});

export default activeUserStyles;
