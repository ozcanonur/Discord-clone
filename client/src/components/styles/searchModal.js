const searchModalStyles = {
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: 'rgb(54,57,63)',
    boxShadow: '0 1rem 1rem rgb(0, 0, 0)',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    outline: 'none',
    width: '50vw',
  },
  input: {
    backgroundColor: 'rgb(114,118, 125)',
    borderRadius: '1rem',
    boxShadow: '0 1rem 1rem rgba(0, 0, 0, 0.2)',

    '& fieldset': {
      border: 'none',
    },

    '& .Mui-focused': {
      color: 'rgb(220,221,222)',
    },
  },
  inputProps: {
    fontSize: '2rem',
    color: 'rgb(220,221,222)',
    fontFamily: 'Lato, sans-serif',
  },
  footer: {
    paddingTop: '2rem',
    color: 'rgb(220,221,222)',
    borderTop: '1px solid rgba(220,221,222, 0.1)',
    fontSize: '1.3rem',
    fontWeight: 700,
    textAlign: 'center',
    width: '100%',
  },
  protip: {
    color: 'rgb(67,181,129)',
    textTransform: 'uppercase',
    fontWeight: 1000,
  },
  footerText: {
    marginLeft: '0.5rem',
    letterSpacing: 0,
  },
  prefix: {
    color: 'rgb(67,181,129)',
    fontWeight: 1000,
    opacity: 1,
    marginLeft: '0.5rem',
    marginRight: '0.5rem',
  },
  results: {
    width: '100%',
  },
  result: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem 1rem',
    color: 'rgb(220,221,222)',
    fontSize: '1.5rem',
    fontFamily: 'Lato, sans-serif',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all .2s ease-in-out',

    '&:hover': {
      backgroundColor: 'rgb(64, 67, 74)',
    },
  },
  resultText: {},
  resultSecondaryText: {
    opacity: 0.5,
  },
  noResults: {
    height: '6vh',
    color: 'rgb(220,221,222)',
    fontSize: '1.8rem',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default searchModalStyles;
