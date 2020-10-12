import createStyles from '@material-ui/core/styles/createStyles';

const serverCardStyles = createStyles({
  container: {
    backgroundColor: '#202225',
    color: 'white',
    boxShadow: '0 1rem 1rem rgba(0, 0, 0, 0.2)',
    cursor: 'pointer',
    transition: 'transform .3s',
    display: 'flex',
    flexDirection: 'column',

    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  imgContainer: {
    backgroundColor: 'black',
    height: '10rem',
    position: 'relative',
  },
  img: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
  bodyContainer: {
    padding: '1rem',
    color: '#dcddde',
    flexGrow: 1,
  },
  title: {
    marginTop: '1rem',
    fontSize: '1.5rem',
    fontWeight: 1000,
  },
  description: {
    opacity: 0.8,
    fontSize: '1.2rem',
    marginTop: '0.7rem',
  },
  footer: {
    marginTop: '3rem',
    display: 'flex',
    justifyContent: 'space-between',
  },
  online: {
    display: 'flex',
    alignItems: 'center',
  },
  smallIcon: {
    backgroundColor: 'green',
    borderRadius: '50%',
    height: '1rem',
    width: '1rem',
    marginRight: '0.5rem',
  },
  smallIcon2: {
    backgroundColor: '#dcddde',
    borderRadius: '50%',
    height: '1rem',
    width: '1rem',
    marginRight: '0.5rem',
  },
  messageCount: {
    display: 'flex',
    alignItems: 'center',
  },
  subscribedText: {
    color: 'green',
    marginLeft: '1rem',
  },
});

export default serverCardStyles;
