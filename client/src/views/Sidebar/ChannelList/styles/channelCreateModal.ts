import createStyles from '@material-ui/core/styles/createStyles';

const channelCreateModalStyles = createStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: '#36393f',
    boxShadow: '0 1rem 1rem #000000',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    outline: 'none',
    width: '50vw',
  },
  modalHeading: {
    fontSize: '1.8rem',
    fontWeight: 1000,
    color: 'white',
    alignSelf: 'flex-start',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginTop: '0.8rem',
  },
  modalInputContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: '2rem',
  },
  inputLabel: {
    fontSize: '1.6rem',
    color: 'white',
    fontWeight: 500,
    textTransform: 'uppercase',
    opacity: 0.6,
  },
  input: {
    marginTop: '1rem',
  },
  inputProps: {
    fontSize: '1.5rem',
    fontWeight: 500,
    color: 'white',
    opacity: 0.9,
    fontFamily: 'Whitney Medium, sans-serif',
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: '2rem',
  },
  modalButton: {
    fontSize: '1.5rem',
    backgroundColor: '#7289da',
    color: 'white',
    padding: '0.6rem 3rem',
    transition: 'all .2s ease-in-out',
    fontFamily: 'Whitney Medium, sans-serif',
    boxShadow: '0 1rem 1rem rgba(0, 0, 0, 0.2)',
    '&:hover': {
      backgroundColor: '#677bc4',
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

export default channelCreateModalStyles;
