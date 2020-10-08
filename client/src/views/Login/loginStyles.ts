import createStyles from '@material-ui/core/styles/createStyles';

const loginStyles = createStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: 'rgb(47,49,54)',
  },
  avatar: {
    backgroundColor: '#3CB371',
    marginBottom: '1rem',
  },
  form: { color: 'rgb(220,221,222)' },
  submit: {
    backgroundColor: '#3CB371',
    color: 'black',
  },
  InputProps: {
    color: 'rgb(220,221,222)',
    fontSize: '2rem',
  },
  title: {
    fontSize: '2rem',
    color: 'rgb(220,221,222)',
  },
});

export default loginStyles;
