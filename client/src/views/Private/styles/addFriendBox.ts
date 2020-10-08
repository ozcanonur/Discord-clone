import createStyles from '@material-ui/core/styles/createStyles';

const addFriendBoxStyles = createStyles({
  container: {
    padding: '2rem 3rem',
    flexGrow: 1,
  },
  heading: {
    fontSize: '1.6rem',
    fontWeight: 1000,
    color: 'rgb(220,221,222)',
    textTransform: 'uppercase',
  },
  subHeading: {
    fontSize: '1.3rem',
    color: 'rgb(220,221,222)',
    opacity: 0.8,
    marginTop: '1.5rem',
  },
  inputContainer: {
    marginTop: '2rem',
    backgroundColor: 'rgba(0,0,0, 0.1)',
    borderRadius: '1rem',
  },
  inputLabel: {},
  inputProps: {
    fontSize: '1.5rem',
    fontWeight: 500,
    color: 'white',
    opacity: 0.9,
    fontFamily: 'Lato, sans-serif',
  },
  button: {
    fontSize: '1.2rem',
    fontWeight: 700,
    backgroundColor: '#7289da',
    color: 'white',
    fontFamily: 'Lato, sans-serif',
    width: '20rem',
    transition: 'all .2s ease-in-out',

    '&:hover': {
      backgroundColor: '#677bc4',
    },
  },
  hr: {
    height: '1px',
    backgroundColor: 'rgb(41,43,47)',
    marginTop: '3rem',
  },
  helperText: {
    fontSize: '1.4rem',
    fontWeight: 700,
    fontFamily: 'Lato, sans-serif',
    marginLeft: 0,
    marginTop: '0.7rem',
    color: '#3CB371',
  },
  helperErrorText: {
    fontSize: '1.4rem',
    fontWeight: 700,
    fontFamily: 'Lato, sans-serif',
    marginLeft: 0,
    marginTop: '0.7rem',
  },
});

export default addFriendBoxStyles;
