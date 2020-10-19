import createStyles from '@material-ui/core/styles/createStyles';

const loginStyles = createStyles({
  container: {
    width: '100%',
    height: '100%',
    padding: '10% 35%',
    backgroundColor: '#202225',
  },
  login: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    borderRadius: '1rem',
    backgroundColor: '#36393F',
  },
  avatar: {
    backgroundColor: '#7289da',
    marginBottom: '1rem',
    height: '6rem',
    width: '6rem',
    boxShadow: '0 1rem 1rem rgba(0, 0, 0, 0.2)',
  },
  avatarIcon: {
    fontSize: '3rem',
  },
  form: {
    color: '#dcddde',
    width: '100%',
  },
  submit: {
    backgroundColor: '#7289da',
    color: 'rgb(220,221,222)',
    fontSize: '2rem',
    marginTop: '2rem',
    textTransform: 'none',
    width: '12rem',
    '&:hover': {
      backgroundColor: '#5869a8',
    },
  },
  inputProps: {
    color: '#dcddde',
    fontSize: '2rem',
    boxShadow: '0 1rem 1rem rgba(0, 0, 0, 0.2)',
    backgroundColor: '#40444B',
  },
  root: {
    '& label': {
      fontSize: '1.5rem',
    },
  },
  inputLabelProps: {
    fontSize: '1.5rem',
    color: 'rgba(220,221,222, 0.5)',
  },
  title: {
    fontSize: '2rem',
    color: '#dcddde',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  helperText: {
    fontSize: '1.4rem',
    fontFamily: 'Whitney Medium, sans-serif',
    marginLeft: 0,
    marginTop: '0.7rem',
    color: '#3CB371',
  },
  helperErrorText: {
    fontSize: '1.4rem',
    fontFamily: 'Whitney Medium, sans-serif',
    marginLeft: 0,
    marginTop: '0.7rem',
  },
});

export default loginStyles;
