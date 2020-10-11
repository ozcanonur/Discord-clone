import createStyles from '@material-ui/core/styles/createStyles';

const userTooltipStyles = createStyles({
  container: {
    position: 'absolute',
    height: '40rem',
    width: '25rem',
    backgroundColor: 'rgb(32,34,37)',
    left: '5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'rgb(220,221,222)',
    zIndex: 9999,
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
  },
  headerImg: {
    backgroundColor: 'rgb(114, 137, 218)',
    borderRadius: '50%',
    padding: '2rem',
    width: '5rem',
    height: '5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '1rem',
  },
  img: {
    width: '4rem',
    height: '4rem',
    color: 'white',
  },
  headerText: {
    fontWeight: 1000,
    marginTop: '1.5rem',
    color: 'rgb(220,221,222)',
    fontSize: '1.5rem',
  },
  servers: {
    flexGrow: 1,
    backgroundColor: 'rgb(47,49,54)',
    width: '100%',
    marginTop: '1rem',
    padding: '1.5rem',
    overflow: 'auto',
  },
  server: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 0,
    paddingBottom: '1rem',
  },
  serverText: {
    overflowX: 'hidden',
    fontSize: '1.4rem',
  },
  button: {
    fontSize: '1rem',
    backgroundColor: '#7289da',
    color: 'white',
    fontFamily: 'Whitney Medium, sans-serif',
    transition: 'all .2s ease-in-out',

    '&:hover': {
      backgroundColor: '#677bc4',
    },
  },
  noteContainer: {
    width: '100%',
    padding: '1rem 2rem',
    paddingBottom: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
  },
  noteTitle: {
    marginBottom: '1rem',
    fontSize: '1.4rem',
    overflow: 'auto',
  },
  inputLabel: {
    color: 'rgb(220,221,222)',
    fontFamily: 'Whitney Medium, sans-serif',
  },
  inputProps: {
    fontFamily: 'Whitney Medium, sans-serif',
    fontSize: '1.2rem',
    color: 'rgb(220,221,222)',
    backgroundColor: 'rgb(64,68,75)',
    borderRadius: '1rem',
    boxShadow: '0 0.2rem 0.2rem rgba(0, 0, 0, 0.2)',
    padding: '1.5rem',
  },
  buttonPrivate: {
    fontSize: '1rem',
    backgroundColor: '#7289da',
    color: 'white',
    transition: 'all .2s ease-in-out',

    '&:hover': {
      backgroundColor: '#677bc4',
    },
    marginTop: '0.5rem',
    marginBottom: '1.5rem',
    width: '100%',
  },
});

export default userTooltipStyles;
