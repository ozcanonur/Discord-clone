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
});

export default indexStyles;
