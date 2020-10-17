import createStyles from '@material-ui/core/styles/createStyles';

const messageStyles = createStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: '1rem 0',
  },
  avatar: {
    backgroundColor: '#3CB371',
    borderRadius: '50%',
    padding: '2rem',
  },
  message: {
    marginLeft: '1rem',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
  },
  username: {
    color: '#FFA200',
    fontWeight: 1000,
  },
  date: {
    marginLeft: '0.5rem',
    fontSize: '1.2rem',
    color: 'rgb(114,118,125)',
  },
  messageText: {
    fontFamily: 'Whitney Book Regular, sans-serif',
    fontWeight: 500,
    marginTop: '0.5rem',
    color: '#dcddde',
    overflowWrap: 'anywhere',
    whiteSpace: 'pre',
    lineHeight: '2.3rem',
  },
  iconContainer: {
    backgroundColor: '#7289da',
    borderRadius: '50%',
    padding: '2rem',
    width: '1.5rem',
    height: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    position: 'relative',
    cursor: 'pointer',
  },
  icon: {
    width: '3.3rem',
  },
  pinnedMessage: {
    color: '#FFA200',
    transform: 'translateY(-2px) translateX(-6px)',
  },
});

export default messageStyles;
