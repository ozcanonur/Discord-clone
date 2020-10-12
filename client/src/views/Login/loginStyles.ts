import createStyles from '@material-ui/core/styles/createStyles';

const loginStyles = createStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#2f3136',
  },
  avatar: {
    backgroundColor: '#3CB371',
    marginBottom: '1rem',
  },
  form: { color: '#dcddde' },
  submit: {
    backgroundColor: '#3CB371',
    color: 'black',
  },
  InputProps: {
    color: '#dcddde',
    fontSize: '2rem',
  },
  title: {
    fontSize: '2rem',
    color: '#dcddde',
  },
});

export default loginStyles;
