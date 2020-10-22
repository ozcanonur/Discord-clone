import createStyles from '@material-ui/core/styles/createStyles';

const indexStyles = createStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  chatContainer: {
    backgroundColor: '#36393f',
    color: 'white',
    fontWeight: 1000,
    flexGrow: 1,
    display: 'flex',
    height: 0,
  },
});

export default indexStyles;
