import createStyles from '@material-ui/core/styles/createStyles';

const indexStyles = createStyles({
  serverList: {
    height: '100vh',
    backgroundColor: '#202225',
    color: 'white',
    fontSize: '2rem',
    overflowX: 'hidden',
    overflowY: 'auto',
    padding: '0.8rem',
  },
  tooltip: {
    backgroundColor: 'black',
    color: '#dcddde',
    fontSize: '1.5rem',
    textAlign: 'center',
    padding: '1rem 2rem',
    letterSpacing: 0,
  },
  arrow: {
    color: 'black',
  },
  list: {
    padding: 0,
  },
  listItem: {
    padding: 0,
  },
  menuPaper: {
    backgroundColor: '#202225',
    color: '#dcddde',
    borderRadius: '1rem',
  },
  menuList: {
    padding: '1rem',
  },
  menuItem: {
    fontFamily: 'Whitney Medium, sans-serif',
    fontSize: '1.5rem',
    fontWeight: 600,
    padding: '1rem 2rem',
    borderRadius: '1rem',

    '&:hover': {
      backgroundColor: '#dcddde',
      color: 'black',
    },
  },
});

export default indexStyles;
