import createStyles from '@material-ui/core/styles/createStyles';
import bgImage from '../../../assets/discordBg.jpg';

const loginStyles = createStyles({
  container: {
    width: '100%',
    height: '100%',
    backgroundImage: 'url(' + bgImage + ')',
    backgroundSize: 'cover',
    backgroundPosition: 'center',

    '@media (min-width: 1600px)': {},
  },
  loginContainer: {
    width: '50rem',
    position: 'absolute',
    left: '20%',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 9,
  },
  login: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3rem 2.5rem',
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
    marginTop: '2rem',
  },
  submit: {
    backgroundColor: '#7289da',
    color: 'rgb(220,221,222)',
    fontSize: '1.8rem',
    marginTop: '2rem',
    textTransform: 'none',
    width: '14rem',
    '&:hover': {
      backgroundColor: '#5869a8',
    },
  },
  inputProps: {
    color: '#dcddde',
    fontSize: '2rem',
    // boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.2)',
    backgroundColor: '#303339',

    '& > input': {
      padding: '1.5rem',
    },
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
  subtitle: {
    fontSize: '1.5rem',
    opacity: 0.8,
    color: 'rgb(220,221,222)',
    marginTop: '1rem',
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
