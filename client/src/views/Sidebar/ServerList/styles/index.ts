import createStyles from '@material-ui/core/styles/createStyles';

const indexStyles = createStyles({
  serverList: {
    height: '100vh',
    backgroundColor: 'rgb(32,34,37)',
    color: 'white',
    fontSize: '2rem',
    overflowX: 'hidden',
    overflowY: 'auto',
    padding: '0.8rem',
  },
  tooltip: {
    backgroundColor: 'rgb(32,34,37)',
    color: 'rgb(220,221,222)',
    fontSize: '1.5rem',
    fontWeight: 700,
    textAlign: 'center',
    letterSpacing: 0,
    padding: '1rem 2rem',
  },
  arrow: {
    color: 'rgb(32,34,37)',
  },
  list: {
    padding: 0,
  },
  listItem: {
    padding: 0,
  },
  menuPaper: {
    backgroundColor: 'rgb(32,34,37)',
    color: 'rgb(220,221,222)',
    borderRadius: '1rem',
  },
  menuList: {
    padding: '1rem',
  },
  menuItem: {
    fontFamily: 'Lato, sans-serif',
    fontSize: '1.5rem',
    fontWeight: 600,
    padding: '1rem 2rem',
    borderRadius: '1rem',

    '&:hover': {
      backgroundColor: 'rgb(220,221,222)',
      color: 'black',
    },
  },
});

export default indexStyles;
