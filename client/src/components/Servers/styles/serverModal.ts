import createStyles from '@material-ui/core/styles/createStyles';

const serverModalStyles = createStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '30vh',
  },
  modalContainer: {
    backgroundColor: 'white',
    boxShadow: '0 1rem 1rem #000000',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    outline: 'none',
    width: '25vw',
    position: 'absolute',
    top: '20vh',
  },
  modalHeading: {
    fontSize: '2.5rem',
    fontWeight: 1000,
    color: '#36393f',
    marginBottom: '2rem',
  },
  modalSubHeading: {
    fontSize: '1.6rem',
    fontWeight: 400,
    color: '#4f5660',
    opacity: 0.8,
    marginBottom: '1rem',
    textAlign: 'center',
  },
  modalButton: {
    width: '100%',
    fontSize: '1.5rem',
    color: 'white',
    marginTop: '2rem',
    fontFamily: 'Whitney Medium, sans-serif',
    boxShadow: '0 1rem 1rem rgba(0, 0, 0, 0.2)',
    backgroundColor: '#4f5660',
    transition: 'all .2s ease-in-out',

    '&:hover': {
      backgroundColor: '#36393f',
    },
  },
  hr: {
    height: '1px',
    backgroundColor: '#36393f',
    width: '100%',
    marginTop: '2rem',
    opacity: 0.5,
  },
  modalSecondaryHeading: {
    fontSize: '1.6rem',
    fontWeight: 400,
    color: '#4f5660',
    opacity: 0.8,
    marginTop: '2rem',
  },
  modalButton2: {
    width: '100%',
    fontSize: '1.5rem',
    fontWeight: 500,
    color: 'white',
    marginTop: '2rem',
    backgroundColor: '#7289da',
    fontFamily: 'Whitney Medium, sans-serif',
    transition: 'all .2s ease-in-out',
    boxShadow: '0 1rem 1rem rgba(0, 0, 0, 0.2)',

    '&:hover': {
      backgroundColor: '#5869a8',
    },
  },
});

export default serverModalStyles;
