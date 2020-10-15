import createStyles from '@material-ui/core/styles/createStyles';

const serverCreateModalStyles = createStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  modalHeading: {
    fontSize: '2.5rem',
    fontWeight: 1000,
    color: '#202225',
    marginBottom: '2rem',
  },
  modalSubHeading: {
    fontSize: '1.6rem',
    fontWeight: 400,
    color: '#4f5660',
    opacity: 0.8,
  },
  modalIconUpload: {
    color: 'white',
    marginTop: '1rem',
  },
  modalInputContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: '2rem',
  },
  inputLabel: {
    fontSize: '1.5rem',
    color: '#4f5660',
    fontWeight: 900,
    textTransform: 'uppercase',
    opacity: 0.8,
  },
  input: {
    marginTop: '1rem',
  },
  inputProps: {
    fontSize: '1.5rem',
    fontFamily: 'Whitney Medium, sans-serif',
    color: '#4f5660',
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '2rem',
  },
  modalButton: {
    width: '12rem',
    fontSize: '1.5rem',
    fontFamily: 'Whitney Medium, sans-serif',
    boxShadow: '0 1rem 1rem rgba(0, 0, 0, 0.2)',
    backgroundColor: '#7289da',
    color: 'white',
    padding: '0.6rem 3rem',
    transition: 'all .2s ease-in-out',
    '&:hover': {
      backgroundColor: '#5869a8',
    },
  },
  serverContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
    cursor: 'pointer',
    borderLeft: (isSelected) => (isSelected ? '3px solid white' : 'none'),
  },
  server: {
    backgroundColor: (isSelected) => (isSelected ? '#7289da' : '#36393f'),
    borderRadius: '50%',
    width: '10rem',
    height: '10rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.6rem',
    fontWeight: 1000,
    textAlign: 'center',
    color: '#dcddde',
    letterSpacing: '1.5px',
    transition: 'all .2s ease-in-out',
    '& > svg': {
      fontSize: '3rem',
      color: '#3CB371',
    },
    '&:hover': {
      backgroundColor: '#7289da',
      borderRadius: '40%',
      '& > *': {
        color: 'white',
      },
    },

    '&:active': {
      transform: 'translateY(2px)',
    },
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

export default serverCreateModalStyles;
