import createStyles from '@material-ui/core/styles/createStyles';

const exploreModalStyles = createStyles({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: '#36393f',
    boxShadow: '0 1rem 1rem #000000',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '6px',
    outline: 'none',
    height: '80vh',
    width: '90rem',
  },
  inputContainer: {
    padding: '2rem',
    width: '100%',
  },
  input: {
    backgroundColor: '#72767d',
    borderRadius: '1rem',
    boxShadow: '0 1rem 1rem rgba(0, 0, 0, 0.2)',

    '& fieldset': {
      border: 'none',
    },

    '& .Mui-focused': {
      color: '#dcddde',
    },
  },
  inputProps: {
    fontSize: '2rem',
    color: '#dcddde',
    fontFamily: 'Whitney Medium, sans-serif',
  },
  serversContainer: {
    width: '100%',
    padding: '2rem',
    paddingTop: '1rem',
    display: 'grid',
    gridGap: '2rem',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    overflow: 'auto',
    marginBottom: '2rem',
  },
});

export default exploreModalStyles;
