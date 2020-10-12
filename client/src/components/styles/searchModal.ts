import createStyles from '@material-ui/core/styles/createStyles';

const searchModalStyles = createStyles({
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
    maxHeight: '50vh',
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
  footer: {
    paddingTop: '2rem',
    color: '#dcddde',
    borderTop: '1px solid rgba(220,221,222, 0.1)',
    fontSize: '1.3rem',
    fontWeight: 700,
    textAlign: 'center',
    width: '100%',
  },
  protip: {
    color: '#43b581',
    textTransform: 'uppercase',
    fontWeight: 1000,
  },
  footerText: {
    marginLeft: '0.5rem',
    letterSpacing: 0,
  },
  prefix: {
    color: '#43b581',
    fontWeight: 1000,
    opacity: 1,
    marginLeft: '0.5rem',
    marginRight: '0.5rem',
  },
  results: {
    width: '100%',
    overflow: 'auto',
  },
  result: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem 1rem',
    color: '#dcddde',
    fontSize: '1.5rem',
    fontFamily: 'Whitney Medium, sans-serif',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all .2s ease-in-out',

    '&:hover': {
      backgroundColor: '#40434a',
    },
  },
  resultText: {},
  resultSecondaryText: {
    opacity: 0.5,
  },
  noResults: {
    height: '6vh',
    color: '#dcddde',
    fontSize: '1.8rem',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default searchModalStyles;
