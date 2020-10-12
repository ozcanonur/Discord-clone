import createStyles from '@material-ui/core/styles/createStyles';

const headerStyles = createStyles({
  header: {
    height: '6rem',
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: 1000,
    padding: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '2px solid #202225',
  },
  serverName: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    color: '#dcddde',
  },
  iconButton: {
    display: 'inline-block',
    color: 'white',
    padding: 0,
  },
  item: { fontSize: '2rem' },
});

export default headerStyles;
