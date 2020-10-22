import createStyles from '@material-ui/core/styles/createStyles';

const serverJoinModalStyles = createStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    backgroundColor: 'white',
    boxShadow: '0 1rem 1rem #000000',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    outline: 'none',
    width: '45rem',
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
    marginBottom: '2rem',
    textAlign: 'center',
  },
  textFieldLabel: {
    alignSelf: 'flex-start',
    fontSize: '1.5rem',
    color: '#4f5660',
    opacity: 0.8,
    textTransform: 'uppercase',
    fontWeight: 900,
  },
  textField: {
    marginTop: '1rem',
  },
  inputProps: {
    fontSize: '1.5rem',
    fontFamily: 'Whitney Medium, sans-serif',
    color: '#4f5660',
  },
  modalFooter: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    fontSize: '1.5rem',
    color: 'white',
    marginTop: '2rem',
    fontFamily: 'Whitney Medium, sans-serif',
    boxShadow: '0 1rem 1rem rgba(0, 0, 0, 0.2)',
    backgroundColor: '#7289da',
    padding: '0.6rem 3rem',
    transition: 'all .2s ease-in-out',
    '&:hover': {
      backgroundColor: '#5869a8',
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

export default serverJoinModalStyles;
