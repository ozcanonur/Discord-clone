const serverJoinModalStyles = {
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    boxShadow: '0 1rem 1rem rgb(0, 0, 0)',
    padding: '3rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    outline: 'none',
    width: '30vw',
  },
  modalHeading: {
    fontSize: '2.5rem',
    fontWeight: 1000,
    color: 'rgb(54,57,63)',
    marginBottom: '1rem',
  },
  modalSubHeading: {
    fontSize: '1.3rem',
    fontWeight: 400,
    color: 'rgb(79, 86, 96)',
    opacity: 0.8,
    marginBottom: '1rem',
    textAlign: 'center',
  },
  inputLabel: {
    alignSelf: 'flex-start',
    fontSize: '1.6rem',
    fontWeight: 400,
    color: 'rgb(79, 86, 96)',
    opacity: 0.8,
    marginTop: '3rem',
  },
  input: {
    marginTop: '1rem',
  },
  inputProps: {
    fontSize: '1.6rem',
    fontWeight: 500,
    fontFamily: 'Lato, sans-serif',
    color: 'rgb(79, 86, 96)',
  },
  modalFooter: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: 'white',
    marginTop: '2rem',
    fontFamily: 'Lato, sans-serif',
    backgroundColor: '#7289da',
    padding: '1rem 3rem',

    '&:hover': {
      backgroundColor: '#5869a8',
    },
  },
};

export default serverJoinModalStyles;
